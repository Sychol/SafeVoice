package com.safevoice.controller.Alert;

import org.apache.commons.codec.binary.Base64;

import java.security.*;
import java.security.spec.*;

public class Utils {

    // VAPID 전용 키 쌍 생성 (secp256r1 곡선)
    public static KeyPair generateVapidKeys() throws NoSuchAlgorithmException, InvalidAlgorithmParameterException {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("EC");
        ECGenParameterSpec ecSpec = new ECGenParameterSpec("secp256r1");
        generator.initialize(ecSpec);
        return generator.generateKeyPair();
    }

    // Base64url (URL-safe) 로 인코딩
    public static String encodePublicKey(PublicKey publicKey) {
        return Base64.encodeBase64URLSafeString(publicKey.getEncoded());
    }

    public static String encodePrivateKey(PrivateKey privateKey) {
        return Base64.encodeBase64URLSafeString(privateKey.getEncoded());
    }

    // 디코딩해서 Key 객체로 복원할 때 사용하는 메서드
    public static PublicKey loadPublicKey(String base64PublicKey) throws Exception {
        byte[] decoded = Base64.decodeBase64(base64PublicKey);
        KeyFactory factory = KeyFactory.getInstance("EC");
        return factory.generatePublic(new X509EncodedKeySpec(decoded));
    }

    public static PrivateKey loadPrivateKey(String base64PrivateKey) throws Exception {
        byte[] decoded = Base64.decodeBase64(base64PrivateKey);
        KeyFactory factory = KeyFactory.getInstance("EC");
        return factory.generatePrivate(new PKCS8EncodedKeySpec(decoded));
    }
}
