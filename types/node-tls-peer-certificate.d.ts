import "node:tls";

declare module "node:tls" {
  interface TLSSocket {
    getPeerCertificate(detailed?: false): import("node:tls").PeerCertificate & {
      issuer: Record<string, string>;
    };
  }
}
