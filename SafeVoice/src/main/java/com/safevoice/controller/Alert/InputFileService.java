package com.safevoice.controller.Alert;

import java.io.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;
import com.safevoice.controller.Command;
import com.safevoice.db.AlertDAO;
import com.safevoice.model.AlertVO;

public class InputFileService implements Command {

    public String execute(HttpServletRequest request, HttpServletResponse response) throws IOException {

        // 1. 파일 업로드 처리
        String uploadDir = "C:/Users/smhrd/Desktop/uploaded";
        int sizeLimit = 100 * 1024 * 1024; // 100MB
        MultipartRequest mtr = new MultipartRequest(request, uploadDir, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());

        // 2. 업로드된 파일명과 자녀 ID 획득
        String fileName = mtr.getFilesystemName("file");
        String filePath = uploadDir + "/" + fileName;
        String childId = mtr.getParameter("memberId");

        // 3. Python 분석 실행
        String result = "";
        try {
            ProcessBuilder pb = new ProcessBuilder("python", "C:/Users/smhrd/PythonLibrary/analyze_file.py", filePath);
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"));
            result = reader.readLine();
            process.waitFor();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 4. 결과 숫자 파싱
        int level = Integer.parseInt(result.trim());

        // 5. 알림 DB 저장 (메시지 없이 유형만 저장)
        AlertVO alert = new AlertVO();
        alert.setMemberId(childId);
        alert.setAlertType(level);
        alert.setLat("0.0");
        alert.setLon("0.0");

        AlertDAO dao = new AlertDAO();
        dao.setAlertInfo(alert);

        // 6. 푸시 알림 전송 (level 1 이상만 전송)
        if (level > 0) {
            String message;
            switch (level) {
                case 1 -> message = "자녀의 활동에서 주의가 필요한 징후가 발견되었어요.";
                case 2 -> message = "⚠️ 자녀의 활동에서 위험 징후가 감지되었습니다.";
                default -> message = "분석 결과를 해석할 수 없습니다.";
            }
            PushNotificationService pushService = new PushNotificationService();
            pushService.sendNotification(childId, "AI 분석 결과", message);
        }

        return null;
    }
}
