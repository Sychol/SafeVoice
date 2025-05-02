package com.safevoice.controller.Alert;

import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;

import com.google.gson.Gson;
import com.safevoice.controller.Command;

import java.io.IOException;
import java.security.*;
import java.security.spec.*;
import java.util.Base64;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SendPushNotificationService implements Command {
    public String execute(HttpServletRequest request, HttpServletResponse response) {
        try {
            String json = SaveSubscriptionService.lastSubscriptionJson;
            MySubscription sub = new Gson().fromJson(json, MySubscription.class);

            String endpoint = sub.getEndpoint();
            byte[] pubKeyBytes = Base64.getDecoder().decode(sub.getKeys().getP256dh());
            byte[] authBytes = Base64.getDecoder().decode(sub.getKeys().getAuth());

            PublicKey userPubKey = KeyFactory.getInstance("EC").generatePublic(new X509EncodedKeySpec(pubKeyBytes));

            Notification notification = new Notification(
                endpoint,
                userPubKey,
                authBytes,
                "{\"title\":\"🛎️ 테스트 알림\",\"body\":\"지금 도착했어요!\"}".getBytes("UTF-8"),
                255
            );

            PushService pushService = new PushService();
            pushService.setPublicKey(Utils.loadPublicKey("BLxkhYVKxY8xeJtMMEMIlLCgH48T17wp1BUviC7fJvGhfn73kSBZEEAEHq3b5jAimOhEOlp8lKMmxa6EAQxeGqo"));
            pushService.setPrivateKey(Utils.loadPrivateKey("MEECAQAwEwYHKoZIzj0CAQYIKoZIzj0DAQcEJzAlAgEBBCAewVXTp4CJLWNgWO03K6d7bw7w-HSdzVCM5pZTrIhIHA"));
            pushService.setSubject("mailto:admin@example.com");

            pushService.send(notification);
            response.getWriter().write("✅ 알림 전송 완료");
        } catch (Exception e) {
            e.printStackTrace();
            try {
                response.getWriter().write("💥 전송 실패: " + e.getMessage());
            } catch (IOException ignored) {}
        }
        return null;
    }
}
