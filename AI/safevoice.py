from transformers import AutoModelForSequenceClassification, AutoTokenizer, TextClassificationPipeline, logging
import torch
import whisper
import pandas as pd
import sys
import os
import warnings

sys.stdout.reconfigure(encoding='utf-8')  # 표준 출력 인코딩 설정

# transformers 라이브러리의 로깅 레벨을 'ERROR'로 설정하여 불필요한 출력 숨기기
logging.set_verbosity_error()

# 상대경로로 CUDA 환경 설정
os.environ["CUDA_VISIBLE_DEVICES"] = "0"  # 사용할 GPU 장치 번호 설정

# 경고 메시지 숨기기
warnings.filterwarnings("ignore", category=UserWarning)

# 현재 스크립트의 절대 경로를 기준으로 상대 경로 설정
os.chdir(os.path.dirname(os.path.abspath(__file__)))
current_dir = os.getcwd()  # 현재 작업 디렉토리

# 음성 인식 모델을 사용하여 음성을 텍스트로 변환하는 함수
def speech_to_text(recording_path, whisper_model):
    whisper_result = whisper_model.transcribe(recording_path)
    whisper_textlist = [seg["text"] for seg in whisper_result.get("segments", []) if seg["text"].strip()]
    return list(dict.fromkeys(whisper_textlist))  # 중복 제거 후 반환

# 감정 분석을 수행하는 함수
def sentiment_analysis(message, sentiment_pipeline):
    results = sentiment_pipeline(message)[0]
    return results[1]["score"], results[0]["score"]  # 긍정/부정 점수 반환

# 학교폭력 분석을 수행하는 함수
def school_violence_analysis(textlist, school_violence_pipe):
    count = sum(1 for sentence in textlist for result in school_violence_pipe(sentence) 
                if any(detail_result['label'] == '학교폭력' and detail_result['score'] >= 0.5 for detail_result in result))
    return count / len(textlist)  # 학교폭력 비율 계산

if __name__ == "__main__":
    # 음성 인식 모델 초기화
    whisper_model = whisper.load_model("small")

    try:
        recording_file = sys.argv[1]  # 명령행 인자로부터 음성 파일 경로를 받음
    except IndexError:
        print("[ERROR] 음성 파일 경로를 입력하세요.")
        sys.exit(1)

    # 상대경로로 음성 파일 경로 설정
    recording_path = os.path.join(current_dir, "recoding", recording_file)  # 상대경로로 음성 파일 경로 지정

    try:
        whisper_textlist = speech_to_text(recording_path, whisper_model)  # 음성 인식
    except Exception as e:
        print(f"[ERROR] 음성 인식 실패: {e}")
        sys.exit(1)

    # 감정 분석 파이프라인 초기화
    sentiment_model_name = "Sychol/nsmc_unsmile_kcbert_large"
    sentiment_tokenizer = AutoTokenizer.from_pretrained(sentiment_model_name)
    sentiment_model = AutoModelForSequenceClassification.from_pretrained(sentiment_model_name)
    sentiment_pipeline = TextClassificationPipeline(
        model=sentiment_model, 
        tokenizer=sentiment_tokenizer, 
        device=0,
        top_k=None,
        return_all_scores=True,
        batch_size=16
    )

    # 데이터프레임으로 변환하여 감정 분석 수행
    df = pd.DataFrame(whisper_textlist, columns=['Message'])
    df['Positive'], df['Negative'] = zip(*df['Message'].map(lambda msg: sentiment_analysis(msg, sentiment_pipeline)))
    negative_count = len(df[df['Negative'] > 0.5])
    positive_count = len(df[df['Positive'] > 0.5])
    negative_ratio = negative_count / len(df)

    # 학교폭력 분석 파이프라인 초기화
    school_violence_model_name = "Sychol/school_violence_kcbert_base"
    school_violence_tokenizer = AutoTokenizer.from_pretrained(school_violence_model_name)
    school_violence_model = AutoModelForSequenceClassification.from_pretrained(school_violence_model_name)
    school_violence_pipe = TextClassificationPipeline(
        model=school_violence_model,
        tokenizer=school_violence_tokenizer,
        device=0,
        top_k=None,
        function_to_apply='sigmoid'
    )

    # 학교폭력 분석 수행
    school_violence_ratio = school_violence_analysis(whisper_textlist, school_violence_pipe)

    if negative_ratio > 0.5:
        if school_violence_ratio > 0.7:
            print("경고", flush=True)
        elif school_violence_ratio > 0.5:
            print("주의", flush=True)
        else:
            print("정상", flush=True)
    else:
        print("정상", flush=True)

    # 결과 출력
    # print(f"부정 감정 개수: {negative_count}")
    # print(f"긍정 감정 개수: {positive_count}")
    # print(f"전체 문장 개수: {len(df)}")
    # print(f"부정 감정 비율: {negative_ratio:.2f}")
    # print(f"학교폭력 비율: {school_violence_ratio:.2f}")