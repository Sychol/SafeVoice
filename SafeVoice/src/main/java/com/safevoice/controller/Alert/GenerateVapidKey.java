package com.safevoice.controller.Alert;

import java.security.*;
import java.security.interfaces.ECPrivateKey;
import java.security.interfaces.ECPublicKey;
import java.security.spec.ECGenParameterSpec;
import org.apache.commons.codec.binary.Base64;

public class GenerateVapidKey {

    public static void main(String[] args) throws Exception {
        // 1. EC 키쌍 생성 (secp256r1)
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("EC");
        keyGen.initialize(new ECGenParameterSpec("secp256r1"));
        KeyPair keyPair = keyGen.generateKeyPair();

        // 2. 공개키 → 압축되지 않은 ECPoint (04 + X + Y)
        byte[] publicUncompressed = getUncompressedPublicKey((ECPublicKey) keyPair.getPublic());

        // 3. 비공개키 → S 값만 추출
        byte[] privateKeyBytes = ((ECPrivateKey) keyPair.getPrivate()).getS().toByteArray();

        // 4. Base64url 인코딩 (패딩 제거)
        String publicKey = Base64.encodeBase64URLSafeString(publicUncompressed);
        String privateKey = Base64.encodeBase64URLSafeString(privateKeyBytes);

        // 5. 출력!
        System.out.println("✅ Public Key:\n" + publicKey);
        System.out.println("🔒 Private Key:\n" + privateKey);
    }

    // EC 공개키를 압축되지 않은 포맷으로 변환 (04 + x + y)
    private static byte[] getUncompressedPublicKey(ECPublicKey publicKey) {
        byte[] x = publicKey.getW().getAffineX().toByteArray();
        byte[] y = publicKey.getW().getAffineY().toByteArray();

        x = ensureLength(x, 32);
        y = ensureLength(y, 32);

        byte[] uncompressed = new byte[1 + x.length + y.length];
        uncompressed[0] = 0x04; // 포맷 헤더
        System.arraycopy(x, 0, uncompressed, 1, x.length);
        System.arraycopy(y, 0, uncompressed, 1 + x.length, y.length);
        return uncompressed;
    }

    // 길이가 32바이트가 되도록 앞에 0 패딩
    private static byte[] ensureLength(byte[] src, int length) {
        if (src.length == length) return src;
        byte[] dest = new byte[length];
        System.arraycopy(src, Math.max(0, src.length - length), dest, length - Math.min(src.length, length), Math.min(src.length, length));
        return dest;
    }
}
