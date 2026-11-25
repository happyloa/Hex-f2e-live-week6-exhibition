export function useDemoAccount() {
  const mode = useState<"signin" | "signup" | null>(
    "account-dialog",
    () => null,
  );
  const name = useState("account-display-name", () => "");
  return { mode, name };
}
