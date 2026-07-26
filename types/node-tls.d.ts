import "node:tls";

declare module "node:tls" {
  interface TLSSocket {
    getPeerCertificate(): {
      valid_to?: string;
      issuer?: {
        O?: string;
        CN?: string;
      };
    };
  }
}
