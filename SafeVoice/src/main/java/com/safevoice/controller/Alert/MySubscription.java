package com.safevoice.controller.Alert;

public class MySubscription {
    private String endpoint;
    private String expirationTime;
    private Keys keys;

    public String getEndpoint() {
        return endpoint;
    }

    public String getExpirationTime() {
        return expirationTime;
    }

    public Keys getKeys() {
        return keys;
    }

    public static class Keys {
        private String p256dh;
        private String auth;

        public String getP256dh() {
            return p256dh;
        }

        public String getAuth() {
            return auth;
        }
    }
}