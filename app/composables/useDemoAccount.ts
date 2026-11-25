export function useDemoAccount() {
  const name = useState("account-display-name", () => "");
  const ready = useState("account-ready", () => false);

  function setName(value: string) {
    name.value = value.trim().slice(0, 32);
    try {
      if (name.value)
        sessionStorage.setItem("exhibinection.account-name", name.value);
      else sessionStorage.removeItem("exhibinection.account-name");
    } catch {
      // The current page session still keeps the display name.
    }
  }

  function restore() {
    try {
      name.value = (sessionStorage.getItem("exhibinection.account-name") ?? "")
        .trim()
        .slice(0, 32);
    } catch {
      // Browser storage is optional for the demo account.
    }
    ready.value = true;
  }

  return { name, ready, setName, restore };
}
