import styles from "./auth-layout.module.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.auth_background}>{children}</div>;
}
