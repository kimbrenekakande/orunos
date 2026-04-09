import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailVerificationProps {
  username: string;
  verificationUrl: string;
  expiresIn?: string;
}

export const EmailVerification = ({
  username,
  verificationUrl,
  expiresIn = "24 hours",
}: EmailVerificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address - Orunos</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.logoSection}>
            <Img
              src={`https://orunos.com/brand/logo_white.png`}
              width="50"
              height="auto"
              alt="Orunos"
              style={styles.logo}
            />
          </Section>

          <Section style={styles.card}>
            <Heading style={styles.heading}>Verify your email</Heading>
            <Text style={styles.subtext}>
              Hi {username}, welcome to Orunos. Click the button below to verify your email address.
            </Text>

            <Section style={styles.buttonContainer}>
              <Button href={verificationUrl} style={styles.button}>
                Verify Email Address
              </Button>
            </Section>

            <Text style={styles.linkText}>
              Or copy and paste this link into your browser:{" "}
              <Link href={verificationUrl} style={styles.link}>
                {verificationUrl}
              </Link>
            </Text>

            <Section style={styles.divider} />

            <Text style={styles.footer}>
              This link expires in {expiresIn}. If you didn&apos;t create an Orunos account, you can safely ignore this email.
            </Text>
          </Section>

          <Section style={styles.footerSection}>
            <Text style={styles.copyright}>© 2026 Orunos. All rights reserved.</Text>
            <Text style={styles.address}>Magezi Technologies, LLC</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const BRAND_COLOR = "#f97316";

const styles = {
  body: {
    backgroundColor: "#0a0a0f",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  container: {
    maxWidth: "480px",
    margin: "40px auto",
    padding: "0 20px",
  },
  logoSection: {
    textAlign: "center" as const,
    marginBottom: "32px",
  },
  logo: {
    display: "inline-block",
    margin: "0 auto",
  },
  card: {
    borderRadius: "20px",
    padding: "48px 40px",
  },
  heading: {
    color: "#ffffff",
    fontSize: "26px",
    fontWeight: "700",
    textAlign: "center" as const,
    margin: "0 0 16px 0",
    letterSpacing: "-0.5px",
  },
  subtext: {
    color: "#a1a1aa",
    fontSize: "15px",
    lineHeight: "1.7",
    textAlign: "center" as const,
    margin: "0 0 36px 0",
  },
  buttonContainer: {
    textAlign: "center" as const,
    marginBottom: "28px",
  },
  button: {
    backgroundColor: BRAND_COLOR,
    color: "#ffffff",
    padding: "16px 40px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    textDecoration: "none",
    display: "inline-block",
    letterSpacing: "0.3px",
  },
  linkText: {
    color: "#71717a",
    fontSize: "12px",
    lineHeight: "1.6",
    textAlign: "center" as const,
    wordBreak: "break-all" as const,
  },
  link: {
    color: BRAND_COLOR,
    textDecoration: "underline",
  },
  divider: {
    borderTop: "1px solid rgba(249, 115, 22, 0.1)",
    margin: "32px 0",
  },
  footer: {
    color: "#71717a",
    fontSize: "13px",
    lineHeight: "1.7",
    textAlign: "center" as const,
    margin: "0",
  },
  footerSection: {
    textAlign: "center" as const,
    marginTop: "40px",
  },
  copyright: {
    color: "#52525b",
    fontSize: "12px",
    margin: "0 0 4px 0",
  },
  address: {
    color: "#52525b",
    fontSize: "12px",
    margin: "0",
  },
};

EmailVerification.PreviewProps = {
  username: "alexjohnson",
  verificationUrl: "https://orunos.com/verify?token=abc123xyz",
  expiresIn: "24 hours",
} as EmailVerificationProps;

export default EmailVerification;
