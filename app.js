const STORAGE_KEY = "eurotrustBankingState";
const STARTING_BALANCE = 60000;
const SAVINGS_GOAL = 20000;
const ADMIN_EMAIL = "admin@bundeskonto.de";
const ADMIN_PASSWORD = "admin123";

const defaultState = {
  users: [],
  currentUserId: null,
  language: "en",
  transactions: [],
  adminReviews: [],
  loginAudits: [],
  registrationArchive: []
};

const translations = {
  en: {
    brandIntro: "Secure online banking for your German and European accounts.",
    starterBalance: "Starter balance",
    chooseLanguage: "Choose language",
    language: "Language",
    login: "Login",
    register: "Register",
    welcomeBack: "Welcome back",
    createAccount: "Create account",
    email: "Email",
    emailOrUserId: "Email or User ID",
    userId: "User ID",
    password: "Password",
    firstName: "First name",
    lastName: "Last name",
    phoneNumber: "Phone number",
    phone: "Phone",
    address: "Address",
    iban: "Your IBAN",
    overview: "Overview",
    transfers: "Transfers",
    cards: "Cards",
    savings: "Savings",
    settings: "Settings",
    profileDetails: "Profile details",
    openAccountMenu: "Open account menu",
    logout: "Logout",
    welcome: "Welcome",
    accountHolder: "Account Holder",
    availableBalance: "Available balance",
    monthIncome: "This month income",
    monthSpending: "This month spending",
    quickTransfer: "Quick transfer",
    recipientPlaceholder: "Recipient email",
    amountPlaceholder: "Amount in EUR",
    sendMoney: "Send money",
    transactionHistory: "Transaction history",
    emailNotifications: "Email notifications",
    clear: "Clear",
    makeTransfer: "Make a transfer",
    recipientEmail: "Recipient email",
    recipientIban: "Recipient IBAN",
    transferMode: "SEPA bank transfer",
    transferModeDetail: "Email and IBAN verification required",
    recipientAccount: "Recipient account",
    from: "From",
    to: "To",
    amount: "Amount",
    note: "Note",
    confirmTransfer: "Confirm transfer",
    debitCard: "BundesKonto Debit",
    cardActive: "Card active",
    cardFrozen: "Card frozen",
    cardControls: "Card controls",
    freezeCard: "Freeze card",
    unfreezeCard: "Unfreeze card",
    generateCard: "Generate new card",
    increaseLimit: "Increase limit",
    savingsVault: "Savings vault",
    deposit: "Deposit",
    withdraw: "Withdraw",
    goal: "Goal",
    completed: "completed",
    accountSettings: "Account settings",
    profileSettings: "Account profile",
    identityStatusLabel: "Identity status",
    notVerified: "Not verified",
    pendingReview: "Pending admin review",
    verified: "Verified",
    rejected: "Rejected",
    verificationHint: "Verify your identity once before making transfers.",
    verificationPendingHint: "Your identity documents have been received. Review usually takes 1 to 2 business days. Transfers will be enabled after approval.",
    verificationApprovedHint: "Your identity has been approved. SEPA transfers are now enabled for this account.",
    verificationRejectedHint: "Your identity verification was not approved. Please check your details and submit the verification again.",
    verifyIdentity: "Verify identity",
    identityVerification: "Identity verification",
    birthName: "Birth name",
    birthDate: "Birth date",
    tin: "T.I.N",
    idCardPhoto: "Photo of ID card",
    submitForReview: "Submit for admin review",
    adminReviewQueue: "Admin review queue",
    noPendingReviews: "No pending identity reviews.",
    reviewSubmitted: "Identity verification sent to admin for review.",
    reviewAlreadyApproved: "Identity already approved.",
    transferApprovalRequired: "Identity verification must be approved before transfers are enabled.",
    approve: "Approve",
    reject: "Reject",
    adminApproved: "Identity approved by admin.",
    adminRejected: "Identity rejected by admin.",
    adminOnlyNotice: "Admin review tools are only visible to authorized bank administrators.",
    adminAuditArchive: "Admin records archive",
    loginAttempts: "Login attempts",
    registrationArchive: "Registration archive",
    auditSearchPlaceholder: "Search records by email, user ID, name, IBAN, or TIN",
    noLoginAudits: "No login attempts recorded.",
    noRegistrations: "No registrations archived.",
    loginSuccess: "Successful login",
    loginFailure: "Failed login",
    unknownUser: "User does not exist",
    wrongPassword: "Incorrect password",
    archivedPasswordNote: "Password is not stored in the admin archive.",
    saveChanges: "Save changes",
    noActivity: "No activity yet",
    noActivityDetail: "Your transactions will appear here.",
    noNotifications: "No email notifications yet.",
    notificationDetail: "Successful incoming transfers will appear here.",
    emailExists: "An account already exists with this email.",
    userIdExists: "An account already exists with this user ID.",
    ibanExists: "An account already exists with this IBAN.",
    invalidLogin: "Email or password is incorrect.",
    loginAgain: "Please login again.",
    invalidAmount: "Enter a valid amount greater than zero.",
    recipientMissing: "No registered user exists with that email.",
    ibanMismatch: "The IBAN does not match this recipient email.",
    selfTransfer: "You cannot transfer to your own account.",
    insufficientTransfer: "Insufficient balance for this transfer.",
    sentTo: "{amount} sent to {recipient}. Email notification delivered.",
    quickTransferNote: "Quick transfer",
    openingBalance: "Opening balance",
    accountFunded: "Account funded",
    transferTo: "Transfer to {recipient}",
    transferFrom: "Transfer from {sender}",
    receivedEmailSubject: "Transfer received",
    receivedEmailBody: "{sender} sent you {amount}. Note: {note}",
    profileUpdated: "Profile updated",
    accountChanged: "Account details changed",
    newCardGenerated: "New card generated",
    cardEnding: "Card ending {digits}",
    cardFrozenActivity: "Card frozen",
    cardUnfrozenActivity: "Card unfrozen",
    securityUpdated: "Security setting updated",
    cardLimitIncreased: "Card limit increased",
    dailyLimitUpdated: "Daily limit updated",
    cardFrozenMessage: "Card is now frozen.",
    cardActiveMessage: "Card is active again.",
    newCardMessage: "A new virtual card number has been generated.",
    limitMessage: "Daily card limit increased to EUR 8,000.",
    savingsDeposit: "Savings deposit",
    savingsWithdrawal: "Savings withdrawal",
    movedToSavings: "Moved to savings vault",
    movedToMain: "Moved to main balance",
    insufficientCurrent: "Insufficient current balance.",
    insufficientSavings: "Insufficient savings balance.",
    savingsDepositMessage: "{amount} moved into savings.",
    savingsWithdrawMessage: "{amount} returned to main balance.",
    emailTaken: "Another account already uses that email.",
    settingsSaved: "Settings saved."
  },
  de: {
    brandIntro: "Sicheres Online-Banking für deutsche und europäische Konten.",
    starterBalance: "Startguthaben",
    chooseLanguage: "Sprache wählen",
    language: "Sprache",
    login: "Anmelden",
    register: "Registrieren",
    welcomeBack: "Willkommen zurück",
    createAccount: "Konto erstellen",
    email: "E-Mail",
    emailOrUserId: "E-Mail oder Nutzer-ID",
    userId: "Nutzer-ID",
    password: "Passwort",
    firstName: "Vorname",
    lastName: "Nachname",
    phoneNumber: "Telefonnummer",
    phone: "Telefon",
    address: "Adresse",
    iban: "Ihre IBAN",
    overview: "Übersicht",
    transfers: "Überweisungen",
    cards: "Karten",
    savings: "Sparen",
    settings: "Einstellungen",
    profileDetails: "Profildetails",
    openAccountMenu: "Kontomenü öffnen",
    logout: "Abmelden",
    welcome: "Willkommen",
    accountHolder: "Kontoinhaber",
    availableBalance: "Verfügbares Guthaben",
    monthIncome: "Einnahmen diesen Monat",
    monthSpending: "Ausgaben diesen Monat",
    quickTransfer: "Schnellüberweisung",
    recipientPlaceholder: "Empfänger-E-Mail",
    amountPlaceholder: "Betrag in EUR",
    sendMoney: "Geld senden",
    transactionHistory: "Transaktionsverlauf",
    emailNotifications: "E-Mail-Benachrichtigungen",
    clear: "Löschen",
    makeTransfer: "Überweisung ausführen",
    recipientEmail: "Empfänger-E-Mail",
    recipientIban: "Empfänger-IBAN",
    transferMode: "SEPA-Banküberweisung",
    transferModeDetail: "E-Mail- und IBAN-Prüfung erforderlich",
    recipientAccount: "Empfängerkonto",
    from: "Von",
    to: "An",
    amount: "Betrag",
    note: "Notiz",
    confirmTransfer: "Überweisung bestätigen",
    debitCard: "BundesKonto Debitkarte",
    cardActive: "Karte aktiv",
    cardFrozen: "Karte gesperrt",
    cardControls: "Kartensteuerung",
    freezeCard: "Karte sperren",
    unfreezeCard: "Karte entsperren",
    generateCard: "Neue Karte erstellen",
    increaseLimit: "Limit erhöhen",
    savingsVault: "Sparfach",
    deposit: "Einzahlen",
    withdraw: "Auszahlen",
    goal: "Ziel",
    completed: "erreicht",
    accountSettings: "Kontoeinstellungen",
    profileSettings: "Kontoprofil",
    identityStatusLabel: "Identitätsstatus",
    notVerified: "Nicht verifiziert",
    pendingReview: "Wartet auf Admin-Prüfung",
    verified: "Verifiziert",
    rejected: "Abgelehnt",
    verificationHint: "Verifizieren Sie Ihre Identität einmalig, bevor Überweisungen möglich sind.",
    verificationPendingHint: "Ihre Identitätsunterlagen wurden empfangen. Die Prüfung dauert in der Regel 1 bis 2 Bankarbeitstage. Überweisungen werden nach Freigabe aktiviert.",
    verificationApprovedHint: "Ihre Identität wurde bestätigt. SEPA-Überweisungen sind für dieses Konto jetzt aktiviert.",
    verificationRejectedHint: "Ihre Identitätsprüfung wurde nicht genehmigt. Bitte prüfen Sie Ihre Angaben und reichen Sie die Verifizierung erneut ein.",
    verifyIdentity: "Identität verifizieren",
    identityVerification: "Identitätsprüfung",
    birthName: "Geburtsname",
    birthDate: "Geburtsdatum",
    tin: "T.I.N",
    idCardPhoto: "Foto des Ausweises",
    submitForReview: "Zur Admin-Prüfung senden",
    adminReviewQueue: "Admin-Prüfliste",
    noPendingReviews: "Keine offenen Identitätsprüfungen.",
    reviewSubmitted: "Identitätsprüfung wurde an den Admin gesendet.",
    reviewAlreadyApproved: "Identität ist bereits bestätigt.",
    transferApprovalRequired: "Identitätsprüfung muss genehmigt sein, bevor Überweisungen möglich sind.",
    approve: "Genehmigen",
    reject: "Ablehnen",
    adminApproved: "Identität vom Admin genehmigt.",
    adminRejected: "Identität vom Admin abgelehnt.",
    adminOnlyNotice: "Admin-Prüfwerkzeuge sind nur für autorisierte Bankadministratoren sichtbar.",
    adminAuditArchive: "Admin-Datensatzarchiv",
    loginAttempts: "Anmeldeversuche",
    registrationArchive: "Registrierungsarchiv",
    auditSearchPlaceholder: "Datensätze nach E-Mail, Nutzer-ID, Name, IBAN oder TIN suchen",
    noLoginAudits: "Keine Anmeldeversuche gespeichert.",
    noRegistrations: "Keine Registrierungen archiviert.",
    loginSuccess: "Erfolgreiche Anmeldung",
    loginFailure: "Fehlgeschlagene Anmeldung",
    unknownUser: "Nutzer existiert nicht",
    wrongPassword: "Falsches Passwort",
    archivedPasswordNote: "Passwort wird nicht im Admin-Archiv gespeichert.",
    saveChanges: "Änderungen speichern",
    noActivity: "Noch keine Aktivitäten",
    noActivityDetail: "Ihre Transaktionen erscheinen hier.",
    noNotifications: "Noch keine E-Mail-Benachrichtigungen.",
    notificationDetail: "Erfolgreiche eingehende Überweisungen erscheinen hier.",
    emailExists: "Mit dieser E-Mail existiert bereits ein Konto.",
    userIdExists: "Mit dieser Nutzer-ID existiert bereits ein Konto.",
    ibanExists: "Mit dieser IBAN existiert bereits ein Konto.",
    invalidLogin: "E-Mail oder Passwort ist falsch.",
    loginAgain: "Bitte melden Sie sich erneut an.",
    invalidAmount: "Geben Sie einen gültigen Betrag größer als null ein.",
    recipientMissing: "Es existiert kein registrierter Nutzer mit dieser E-Mail.",
    ibanMismatch: "Die IBAN passt nicht zu dieser Empfänger-E-Mail.",
    selfTransfer: "Sie können nicht auf Ihr eigenes Konto überweisen.",
    insufficientTransfer: "Nicht genügend Guthaben für diese Überweisung.",
    sentTo: "{amount} an {recipient} gesendet. E-Mail-Benachrichtigung zugestellt.",
    quickTransferNote: "Schnellüberweisung",
    openingBalance: "Startguthaben",
    accountFunded: "Konto gutgeschrieben",
    transferTo: "Überweisung an {recipient}",
    transferFrom: "Überweisung von {sender}",
    receivedEmailSubject: "Überweisung erhalten",
    receivedEmailBody: "{sender} hat Ihnen {amount} gesendet. Notiz: {note}",
    profileUpdated: "Profil aktualisiert",
    accountChanged: "Kontodaten geändert",
    newCardGenerated: "Neue Karte erstellt",
    cardEnding: "Karte endet auf {digits}",
    cardFrozenActivity: "Karte gesperrt",
    cardUnfrozenActivity: "Karte entsperrt",
    securityUpdated: "Sicherheitseinstellung aktualisiert",
    cardLimitIncreased: "Kartenlimit erhöht",
    dailyLimitUpdated: "Tageslimit aktualisiert",
    cardFrozenMessage: "Die Karte ist jetzt gesperrt.",
    cardActiveMessage: "Die Karte ist wieder aktiv.",
    newCardMessage: "Eine neue virtuelle Kartennummer wurde erstellt.",
    limitMessage: "Das tägliche Kartenlimit wurde auf EUR 8.000 erhöht.",
    savingsDeposit: "Einzahlung ins Sparfach",
    savingsWithdrawal: "Auszahlung aus dem Sparfach",
    movedToSavings: "Ins Sparfach verschoben",
    movedToMain: "Auf das Hauptkonto verschoben",
    insufficientCurrent: "Nicht genügend Guthaben auf dem Hauptkonto.",
    insufficientSavings: "Nicht genügend Guthaben im Sparfach.",
    savingsDepositMessage: "{amount} ins Sparfach verschoben.",
    savingsWithdrawMessage: "{amount} auf das Hauptkonto zurückgebucht.",
    emailTaken: "Ein anderes Konto verwendet bereits diese E-Mail.",
    settingsSaved: "Einstellungen gespeichert."
  }
};

const activityTextMap = {
  "Opening balance": "openingBalance",
  "Account funded": "accountFunded",
  "Profile updated": "profileUpdated",
  "Account details changed": "accountChanged",
  "New card generated": "newCardGenerated",
  "Card frozen": "cardFrozenActivity",
  "Card unfrozen": "cardUnfrozenActivity",
  "Security setting updated": "securityUpdated",
  "Card limit increased": "cardLimitIncreased",
  "Daily limit updated": "dailyLimitUpdated",
  "Savings deposit": "savingsDeposit",
  "Savings withdrawal": "savingsWithdrawal",
  "Moved to savings vault": "movedToSavings",
  "Moved to main balance": "movedToMain",
  "Quick transfer": "quickTransferNote"
};

let state = loadState();

const authView = document.querySelector("#authView");
const dashboardView = document.querySelector("#dashboardView");
const loginTab = document.querySelector("#loginTab");
const registerTab = document.querySelector("#registerTab");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const loginMessage = document.querySelector("#loginMessage");
const registerMessage = document.querySelector("#registerMessage");
const languageButtons = document.querySelectorAll(".language-button");
const navButtons = document.querySelectorAll(".nav-button");
const pages = document.querySelectorAll(".page");
const pageTitle = document.querySelector("#pageTitle");
const logoutButton = document.querySelector("#logoutButton");
const balanceAmount = document.querySelector("#balanceAmount");
const heroBalanceAmount = document.querySelector("#heroBalanceAmount");
const heroDate = document.querySelector("#heroDate");
const mainAccountBalance = document.querySelector("#mainAccountBalance");
const savingsAccountBalance = document.querySelector("#savingsAccountBalance");
const mainAccountIban = document.querySelector("#mainAccountIban");
const savingsAccountIban = document.querySelector("#savingsAccountIban");
const incomeAmount = document.querySelector("#incomeAmount");
const spendingAmount = document.querySelector("#spendingAmount");
const accountNumber = document.querySelector("#accountNumber");
const welcomeLine = document.querySelector("#welcomeLine");
const profileInitials = document.querySelector("#profileInitials");
const profileName = document.querySelector("#profileName");
const profileEmail = document.querySelector("#profileEmail");
const profileUserId = document.querySelector("#profileUserId");
const menuButton = document.querySelector("#menuButton");
const accountMenu = document.querySelector("#accountMenu");
const menuInitials = document.querySelector("#menuInitials");
const menuName = document.querySelector("#menuName");
const menuEmail = document.querySelector("#menuEmail");
const menuUserId = document.querySelector("#menuUserId");
const menuProfileButton = document.querySelector("#menuProfileButton");
const menuSettingsButton = document.querySelector("#menuSettingsButton");
const menuVerificationButton = document.querySelector("#menuVerificationButton");
const activityList = document.querySelector("#activityList");
const quickTransferForm = document.querySelector("#quickTransferForm");
const quickTransferMessage = document.querySelector("#quickTransferMessage");
const transferForm = document.querySelector("#transferForm");
const transferStatus = document.querySelector("#transferStatus");
const recipientEmailInput = document.querySelector("#recipientEmail");
const recipientIbanInput = document.querySelector("#recipientIban");
const transferAmountInput = document.querySelector("#transferAmount");
const transferNoteInput = document.querySelector("#transferNote");
const recipientPreview = document.querySelector("#recipientPreview");
const recipientPreviewName = document.querySelector("#recipientPreviewName");
const recipientPreviewMeta = document.querySelector("#recipientPreviewMeta");
const summaryFrom = document.querySelector("#summaryFrom");
const summaryTo = document.querySelector("#summaryTo");
const summaryAmount = document.querySelector("#summaryAmount");
const settingsForm = document.querySelector("#settingsForm");
const settingsStatus = document.querySelector("#settingsStatus");
const verificationStatus = document.querySelector("#verificationStatus");
const verificationHint = document.querySelector("#verificationHint");
const goVerificationButton = document.querySelector("#goVerificationButton");
const identityForm = document.querySelector("#identityForm");
const identityStatus = document.querySelector("#identityStatus");
const submitIdentityButton = document.querySelector("#submitIdentityButton");
const birthNameInput = document.querySelector("#birthName");
const birthDateInput = document.querySelector("#birthDate");
const tinInput = document.querySelector("#tin");
const idCardPhotoInput = document.querySelector("#idCardPhoto");
const adminReviewList = document.querySelector("#adminReviewList");
const adminReviewCount = document.querySelector("#adminReviewCount");
const adminAuditPanel = document.querySelector(".admin-audit-panel");
const adminAuditCount = document.querySelector("#adminAuditCount");
const adminAuditSearch = document.querySelector("#adminAuditSearch");
const loginAuditList = document.querySelector("#loginAuditList");
const registrationArchiveList = document.querySelector("#registrationArchiveList");
const clearActivityButton = document.querySelector("#clearActivityButton");
const cardHolderName = document.querySelector("#cardHolderName");
const cardLastDigits = document.querySelector("#cardLastDigits");
const cardState = document.querySelector("#cardState");
const freezeCardButton = document.querySelector("#freezeCardButton");
const newCardButton = document.querySelector("#newCardButton");
const cardLimitButton = document.querySelector("#cardLimitButton");
const cardMessage = document.querySelector("#cardMessage");
const savingsForm = document.querySelector("#savingsForm");
const savingsBalance = document.querySelector("#savingsBalance");
const savingsMessage = document.querySelector("#savingsMessage");
const savingsProgress = document.querySelector("#savingsProgress");
const savingsProgressText = document.querySelector("#savingsProgressText");
const notificationList = document.querySelector("#notificationList");

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return structuredClone(defaultState);
  }

  try {
    return { ...structuredClone(defaultState), ...JSON.parse(saved) };
  } catch {
    return structuredClone(defaultState);
  }
}

function migrateState() {
  state.transactions ||= [];
  state.adminReviews ||= [];
  state.loginAudits ||= [];
  state.registrationArchive ||= [];
  if (!state.users.some((user) => user.email === ADMIN_EMAIL)) {
    state.users.unshift({
      id: "admin-user",
      userId: "ADMIN",
      firstName: "Bank",
      lastName: "Administrator",
      email: ADMIN_EMAIL,
      phone: "+49 30 000000",
      address: "BundesKonto Internal Review Desk",
      password: ADMIN_PASSWORD,
      balance: 0,
      savings: 0,
      iban: "DE00 0000 0000 0000 0000 00",
      cardLastDigits: "0000",
      cardFrozen: false,
      isAdmin: true,
      notifications: [],
      activities: [],
      identityVerification: {
        status: "approved",
        birthName: "Administrator",
        birthDate: "",
        tin: "ADMIN",
        idCardPhoto: "",
        submittedAt: "",
        reviewedAt: ""
      }
    });
  }
  state.users.forEach((user) => {
    user.userId ||= generateUserId(user);
    user.balance = Number.isFinite(Number(user.balance)) ? Number(user.balance) : STARTING_BALANCE;
    user.savings = Number.isFinite(Number(user.savings)) ? Number(user.savings) : 0;
    user.activities ||= [];
    user.notifications ||= [];
    user.isAdmin ||= user.email === ADMIN_EMAIL;
    user.identityVerification ||= {
      status: "not_submitted",
      birthName: "",
      birthDate: "",
      tin: "",
      idCardPhoto: "",
      submittedAt: "",
      reviewedAt: ""
    };
    user.cardLastDigits ||= generateCardDigits();
    user.cardFrozen ||= false;
  });
  state.registrationArchive.forEach((record) => {
    const user = state.users.find((account) => account.id === record.userId || account.email === record.email);
    record.userLoginId ||= user?.userId || "";
  });
  saveState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentLanguage() {
  return state.language === "de" ? "de" : "en";
}

function t(key, replacements = {}) {
  const template = translations[currentLanguage()][key] || translations.en[key] || key;
  return Object.entries(replacements).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, value),
    template
  );
}

function setText(selector, key) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = t(key);
  }
}

function setPlaceholder(selector, key) {
  const element = document.querySelector(selector);
  if (element) {
    element.placeholder = t(key);
  }
}

function getCurrentUser() {
  return state.users.find((user) => user.id === state.currentUserId) || null;
}

function generateUserId(user) {
  if (user.email === ADMIN_EMAIL) {
    return "ADMIN";
  }
  const seed = `${user.email || ""}${user.id || ""}`;
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 1000000;
  }
  return `BK-${String(hash).padStart(6, "0")}`;
}

function normaliseUserId(value) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function formatCurrency(value) {
  return new Intl.NumberFormat(currentLanguage() === "de" ? "de-DE" : "en-IE", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

function formatHeroAmount(value) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function formatHeroDate() {
  const date = new Date();
  const month = date.toLocaleString("de-DE", { month: "short" }).replace(".", "").toUpperCase();
  return `${date.getDate()}. ${month}.<br>${date.getFullYear()}`;
}

function maskIban(iban, suffix) {
  const compact = compactIban(iban || "DE00000000000000000000");
  const prefix = compact.slice(0, 4) || "DE00";
  return `${prefix}••••${compact.slice(-4) || "0000"} ${suffix}`;
}

function parseAmount(value) {
  return Number(String(value).replace(/\s/g, "").replace(",", "."));
}

function setMessage(element, text, type = "") {
  element.textContent = text;
  element.className = `form-message ${type}`.trim();
}

function setStatus(element, text, type = "") {
  element.textContent = text;
  element.className = `status-text ${type}`.trim();
}

function generateCardDigits() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function createActivity(titleKey, amount, kind, noteKey = "", data = {}) {
  return {
    id: crypto.randomUUID(),
    titleKey,
    noteKey,
    data,
    amount,
    kind,
    date: new Date().toLocaleString()
  };
}

function createTransaction({ sender, recipient, amount, note }) {
  return {
    id: crypto.randomUUID(),
    senderId: sender.id,
    senderEmail: sender.email,
    recipientId: recipient.id,
    recipientEmail: recipient.email,
    amount,
    note,
    date: new Date().toLocaleString()
  };
}

function createEmailNotification(transaction, sender) {
  return {
    id: crypto.randomUUID(),
    transactionId: transaction.id,
    subjectKey: "receivedEmailSubject",
    bodyKey: "receivedEmailBody",
    data: {
      sender: `${sender.firstName} ${sender.lastName}`,
      amount: formatCurrency(transaction.amount),
      note: transaction.note || "-"
    },
    date: transaction.date,
    read: false
  };
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function normaliseIban(value) {
  return value.trim().toUpperCase().replace(/\s+/g, " ");
}

function compactIban(value) {
  return normaliseIban(value).replace(/\s/g, "");
}

function findRecipientByEmail(email) {
  const cleanedEmail = email.trim().toLowerCase();
  return state.users.find((user) => user.email.toLowerCase() === cleanedEmail) || null;
}

function updateTransferPreview() {
  if (!recipientPreview || !summaryFrom || !summaryTo || !summaryAmount) {
    return;
  }

  const sender = getCurrentUser();
  const recipient = findRecipientByEmail(recipientEmailInput.value);
  const amount = parseAmount(transferAmountInput.value);
  const enteredIban = compactIban(recipientIbanInput.value);
  const ibanMatches = recipient && enteredIban && compactIban(recipient.iban || "") === enteredIban;

  summaryFrom.textContent = sender ? `${sender.firstName} ${sender.lastName}` : "-";
  summaryTo.textContent = recipient ? recipient.email : "-";
  summaryAmount.textContent = Number.isFinite(amount) && amount > 0 ? formatCurrency(amount) : formatCurrency(0);

  if (recipient && ibanMatches) {
    recipientPreview.classList.remove("hidden", "warning");
    recipientPreviewName.textContent = `${recipient.firstName} ${recipient.lastName}`;
    recipientPreviewMeta.textContent = `${recipient.email} - IBAN ${recipient.iban}`;
    return;
  }

  if (recipient && enteredIban) {
    recipientPreview.classList.remove("hidden");
    recipientPreview.classList.add("warning");
    recipientPreviewName.textContent = t("ibanMismatch");
    recipientPreviewMeta.textContent = recipient.email;
    return;
  }

  recipientPreview.classList.add("hidden");
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage();
  document.title = "BundesKonto Bank";

  setText("#brandIntro", "brandIntro");
  setText("#languagePrompt", "chooseLanguage");
  setText("#dashboardLanguagePrompt", "language");
  setText("#loginTab", "login");
  setText("#registerTab", "register");
  setText("#loginHeading", "welcomeBack");
  setText("#registerHeading", "createAccount");
  setText("#loginEmailLabel", "emailOrUserId");
  setText("#loginPasswordLabel", "password");
  setText("#firstNameLabel", "firstName");
  setText("#lastNameLabel", "lastName");
  setText("#registerEmailLabel", "email");
  setText("#registerUserIdLabel", "userId");
  setText("#phoneLabel", "phoneNumber");
  setText("#addressLabel", "address");
  setText("#registerPasswordLabel", "password");
  setText("#registerIbanLabel", "iban");
  setText("#recipientEmailLabel", "recipientEmail");
  setText("#recipientIbanLabel", "recipientIban");
  setText("#transferModeLabel", "transferMode");
  setText("#transferModeDetail", "transferModeDetail");
  setText("#recipientPreviewLabel", "recipientAccount");
  setText("#summaryFromLabel", "from");
  setText("#summaryToLabel", "to");
  setText("#summaryAmountLabel", "amount");
  setText("#transferAmountLabel", "amount");
  setText("#transferNoteLabel", "note");
  setText("#settingsFirstNameLabel", "firstName");
  setText("#settingsLastNameLabel", "lastName");
  setText("#settingsEmailLabel", "email");
  setText("#settingsPhoneLabel", "phone");
  setText("#settingsAddressLabel", "address");
  setText("#cardProductLabel", "debitCard");
  setText("#profileSettingsHeading", "profileSettings");
  setText("#verificationStatusLabel", "identityStatusLabel");
  setText("#goVerificationButton", "verifyIdentity");
  setText("#identityHeading", "identityVerification");
  setText("#birthNameLabel", "birthName");
  setText("#birthDateLabel", "birthDate");
  setText("#tinLabel", "tin");
  setText("#idCardPhotoLabel", "idCardPhoto");
  setText("#submitIdentityButton", "submitForReview");
  setText("#adminReviewHeading", "adminReviewQueue");
  setText("#adminOnlyNotice", "adminOnlyNotice");
  setText("#adminAuditHeading", "adminAuditArchive");
  setText("#loginAuditHeading", "loginAttempts");
  setText("#registrationArchiveHeading", "registrationArchive");
  setText("#menuProfileButton", "profileDetails");
  setText("#menuSettingsButton", "settings");
  setText("#menuVerificationButton", "identityVerification");
  menuButton.setAttribute("aria-label", t("openAccountMenu"));
  setPlaceholder("#adminAuditSearch", "auditSearchPlaceholder");

  loginForm.querySelector(".primary-button").textContent = t("login");
  registerForm.querySelector(".primary-button").textContent = t("register");
  logoutButton.textContent = t("logout");
  clearActivityButton.textContent = t("clear");
  quickTransferForm.querySelector(".primary-button").textContent = t("sendMoney");
  transferForm.querySelector(".primary-button").textContent = t("confirmTransfer");
  settingsForm.querySelector(".primary-button").textContent = t("saveChanges");
  savingsForm.querySelector('[data-action="deposit"]').textContent = t("deposit");
  savingsForm.querySelector('[data-action="withdraw"]').textContent = t("withdraw");
  newCardButton.textContent = t("generateCard");
  cardLimitButton.textContent = t("increaseLimit");

  setPlaceholder("#quickRecipientEmail", "recipientPlaceholder");
  setPlaceholder("#quickRecipientIban", "recipientIban");
  setPlaceholder("#quickAmount", "amountPlaceholder");
  setPlaceholder("#savingsAmount", "amountPlaceholder");

  const navLabels = {
    overview: "overview",
    transfer: "transfers",
    cards: "cards",
    savings: "savings",
    settings: "settings"
  };

  navButtons.forEach((button) => {
    button.textContent = t(navLabels[button.dataset.page]);
  });

  setText("#overviewPage .balance-card span", "availableBalance");
  setText("#overviewPage .metric-card:nth-child(2) span", "monthIncome");
  setText("#overviewPage .metric-card:nth-child(3) span", "monthSpending");
  setText("#overviewPage .panel h3", "quickTransfer");
  setText("#overviewPage .content-grid .panel:nth-child(2) h3", "transactionHistory");
  setText("#notificationsHeading", "emailNotifications");
  setText("#transferPage h3", "makeTransfer");
  setText("#cardsPage .panel h3", "cardControls");
  setText("#savingsPage .panel:first-child h3", "savingsVault");
  setText("#savingsPage .panel:nth-child(2) h3", "goal");

  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.language === currentLanguage());
  });

  const activeButton = document.querySelector(".nav-button.active");
  if (activeButton) {
    pageTitle.textContent = activeButton.textContent;
  }
}

function showAuth(mode) {
  const isLogin = mode === "login";
  loginTab.classList.toggle("active", isLogin);
  registerTab.classList.toggle("active", !isLogin);
  loginForm.classList.toggle("active", isLogin);
  registerForm.classList.toggle("active", !isLogin);
  loginMessage.textContent = "";
  registerMessage.textContent = "";
}

function showDashboard() {
  authView.classList.add("hidden");
  dashboardView.classList.remove("hidden");
  renderDashboard();
}

function showLoginScreen() {
  dashboardView.classList.add("hidden");
  authView.classList.remove("hidden");
  showAuth("login");
  applyTranslations();
}

function renderDashboard() {
  applyTranslations();
  const user = getCurrentUser();
  if (!user) {
    showLoginScreen();
    return;
  }

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName[0] || ""}${user.lastName[0] || ""}`.toUpperCase();
  welcomeLine.textContent = `${t("welcome")}, ${user.firstName}`;
  profileInitials.textContent = initials || "BK";
  profileName.textContent = fullName || t("accountHolder");
  profileEmail.textContent = user.email;
  profileUserId.textContent = `${t("userId")}: ${user.userId}`;
  menuInitials.textContent = initials || "BK";
  menuName.textContent = fullName || t("accountHolder");
  menuEmail.textContent = user.email;
  menuUserId.textContent = `${t("userId")}: ${user.userId}`;
  balanceAmount.textContent = formatCurrency(user.balance);
  heroBalanceAmount.textContent = formatHeroAmount(user.balance + (user.savings || 0));
  heroDate.innerHTML = formatHeroDate();
  mainAccountBalance.textContent = formatCurrency(user.balance);
  savingsAccountBalance.textContent = formatCurrency(user.savings || 0);
  mainAccountIban.textContent = maskIban(user.iban, "00");
  savingsAccountIban.textContent = maskIban(user.iban, "01");
  savingsBalance.textContent = formatCurrency(user.savings || 0);
  incomeAmount.textContent = formatCurrency(sumActivities(user, "income"));
  spendingAmount.textContent = formatCurrency(Math.abs(sumActivities(user, "spending")));
  accountNumber.textContent = `IBAN: ${user.iban || ""}`;
  cardHolderName.textContent = fullName.toUpperCase();
  cardLastDigits.textContent = user.cardLastDigits || generateCardDigits();
  cardState.textContent = user.cardFrozen ? t("cardFrozen") : t("cardActive");
  freezeCardButton.textContent = user.cardFrozen ? t("unfreezeCard") : t("freezeCard");
  renderActivities(user.activities || []);
  renderNotifications(user.notifications || []);
  renderSavingsProgress(user.savings || 0);
  fillSettings(user);
  renderIdentityState(user);
  renderAdminReviews();
  renderAdminAudits();
  updateTransferPreview();
}

function sumActivities(user, group) {
  return (user.activities || []).reduce((total, item) => {
    if (group === "income" && item.amount > 0) {
      return total + item.amount;
    }
    if (group === "spending" && item.amount < 0) {
      return total + item.amount;
    }
    return total;
  }, 0);
}

function translateActivityText(activity, field) {
  const key = activity[`${field}Key`];
  const raw = activity[field] || "";
  const mappedKey = key || activityTextMap[raw];

  if (mappedKey) {
    return t(mappedKey, activity.data || {});
  }

  if (field === "title" && raw.startsWith("Transfer to ")) {
    return t("transferTo", { recipient: raw.replace("Transfer to ", "") });
  }

  if (raw.startsWith("Card ending ")) {
    return t("cardEnding", { digits: raw.replace("Card ending ", "") });
  }

  return raw || activity.kind;
}

function renderActivities(activities) {
  activityList.innerHTML = "";

  if (activities.length === 0) {
    const emptyItem = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const subtitle = document.createElement("small");
    title.textContent = t("noActivity");
    subtitle.textContent = t("noActivityDetail");
    details.append(title, subtitle);
    emptyItem.append(details);
    activityList.append(emptyItem);
    return;
  }

  activities.slice(0, 12).forEach((activity) => {
    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const subtitle = document.createElement("small");
    const amount = document.createElement("span");
    const amountClass = activity.amount < 0 ? "amount-negative" : "amount-positive";
    const signedAmount = activity.amount < 0 ? formatCurrency(activity.amount) : `+${formatCurrency(activity.amount)}`;

    title.textContent = translateActivityText(activity, "title");
    subtitle.textContent = `${translateActivityText(activity, "note")} - ${activity.date}`;
    amount.className = amountClass;
    amount.textContent = signedAmount;
    details.append(title, subtitle);
    item.append(details, amount);
    activityList.append(item);
  });
}

function renderNotifications(notifications) {
  notificationList.innerHTML = "";

  if (notifications.length === 0) {
    const emptyItem = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const subtitle = document.createElement("small");
    title.textContent = t("noNotifications");
    subtitle.textContent = t("notificationDetail");
    details.append(title, subtitle);
    emptyItem.append(details);
    notificationList.append(emptyItem);
    return;
  }

  notifications.slice(0, 8).forEach((notification) => {
    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const subtitle = document.createElement("small");
    title.textContent = t(notification.subjectKey, notification.data || {});
    subtitle.textContent = `${t(notification.bodyKey, notification.data || {})} - ${notification.date}`;
    details.append(title, subtitle);
    item.append(details);
    notificationList.append(item);
  });
}

function renderSavingsProgress(value) {
  const progress = Math.min(100, Math.round((value / SAVINGS_GOAL) * 100));
  savingsProgress.style.width = `${progress}%`;
  savingsProgressText.textContent = `${progress}% ${t("completed")}`;
}

function fillSettings(user) {
  document.querySelector("#settingsFirstName").value = user.firstName || "";
  document.querySelector("#settingsLastName").value = user.lastName || "";
  document.querySelector("#settingsEmail").value = user.email || "";
  document.querySelector("#settingsPhone").value = user.phone || "";
  document.querySelector("#settingsAddress").value = user.address || "";
  const verification = user.identityVerification || {};
  birthNameInput.value = verification.birthName || "";
  birthDateInput.value = verification.birthDate || "";
  tinInput.value = verification.tin || "";
  const locked = verification.status === "pending" || verification.status === "approved";
  birthNameInput.disabled = locked;
  birthDateInput.disabled = locked;
  tinInput.disabled = locked;
  idCardPhotoInput.disabled = locked;
  submitIdentityButton.disabled = locked;
}

function verificationCopy(status) {
  if (status === "approved") {
    return { label: t("verified"), hint: t("verificationApprovedHint"), type: "success" };
  }
  if (status === "pending") {
    return { label: t("pendingReview"), hint: t("verificationPendingHint"), type: "" };
  }
  if (status === "rejected") {
    return { label: t("rejected"), hint: t("verificationRejectedHint"), type: "error" };
  }
  return { label: t("notVerified"), hint: t("verificationHint"), type: "error" };
}

function renderIdentityState(user) {
  const status = user.identityVerification?.status || "not_submitted";
  const copy = verificationCopy(status);
  verificationStatus.textContent = copy.label;
  verificationHint.textContent = copy.hint;
  verificationStatus.className = copy.type ? `status-pill ${copy.type}` : "status-pill";
  setStatus(identityStatus, copy.label, copy.type);

  if (status === "pending") {
    setStatus(identityStatus, t("verificationPendingHint"));
  }
  if (status === "approved") {
    setStatus(identityStatus, t("verificationApprovedHint"), "success");
  }
  if (status === "rejected") {
    setStatus(identityStatus, t("verificationRejectedHint"), "error");
  }
}

function renderAdminReviews() {
  const currentUser = getCurrentUser();
  const adminPanel = document.querySelector(".admin-review-panel");
  if (!currentUser?.isAdmin) {
    adminPanel.classList.add("hidden");
    return;
  }

  adminPanel.classList.remove("hidden");
  const pendingReviews = (state.adminReviews || []).filter((review) => review.status === "pending");
  adminReviewList.innerHTML = "";
  adminReviewCount.textContent = `${pendingReviews.length}`;

  if (pendingReviews.length === 0) {
    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = t("noPendingReviews");
    details.append(title);
    item.append(details);
    adminReviewList.append(item);
    return;
  }

  pendingReviews.forEach((review) => {
    const user = state.users.find((account) => account.id === review.userId);
    if (!user) {
      return;
    }
    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const subtitle = document.createElement("small");
    const actions = document.createElement("div");
    const image = document.createElement("img");
    const approveButton = document.createElement("button");
    const rejectButton = document.createElement("button");

    title.textContent = `${user.firstName} ${user.lastName}`;
    subtitle.textContent = `${user.email} - Birth name: ${review.birthName} - Birth date: ${review.birthDate} - TIN ${review.tin} - ${review.submittedAt}`;
    image.className = "review-id-image";
    image.alt = "ID card";
    image.src = review.idCardPhoto;
    approveButton.className = "mini-button";
    rejectButton.className = "mini-button danger";
    approveButton.textContent = t("approve");
    rejectButton.textContent = t("reject");
    approveButton.addEventListener("click", () => reviewIdentity(review.id, "approved"));
    rejectButton.addEventListener("click", () => reviewIdentity(review.id, "rejected"));
    actions.className = "review-actions";
    actions.append(approveButton, rejectButton);
    details.append(title, subtitle, image);
    item.append(details, actions);
    adminReviewList.append(item);
  });
}

function auditMatches(record, query) {
  if (!query) {
    return true;
  }
  return JSON.stringify(record).toLowerCase().includes(query.toLowerCase());
}

function renderAdminAudits() {
  const currentUser = getCurrentUser();
  if (!currentUser?.isAdmin) {
    adminAuditPanel.classList.add("hidden");
    return;
  }

  adminAuditPanel.classList.remove("hidden");
  const query = adminAuditSearch.value.trim();
  const loginAudits = (state.loginAudits || []).filter((record) => auditMatches(record, query));
  const registrations = (state.registrationArchive || []).filter((record) => auditMatches(record, query));
  adminAuditCount.textContent = `${loginAudits.length + registrations.length}`;
  loginAuditList.innerHTML = "";
  registrationArchiveList.innerHTML = "";

  if (loginAudits.length === 0) {
    const item = document.createElement("li");
    item.innerHTML = `<div><strong>${t("noLoginAudits")}</strong></div>`;
    loginAuditList.append(item);
  }

  loginAudits.slice(0, 30).forEach((audit) => {
    const item = document.createElement("li");
    const title = audit.success ? t("loginSuccess") : t("loginFailure");
    item.innerHTML = `
      <div>
        <strong>${title}</strong>
        <small>${audit.identifier || audit.email} - ${audit.reason} - ${audit.date}</small>
      </div>
    `;
    loginAuditList.append(item);
  });

  if (registrations.length === 0) {
    const item = document.createElement("li");
    item.innerHTML = `<div><strong>${t("noRegistrations")}</strong></div>`;
    registrationArchiveList.append(item);
  }

  registrations.slice(0, 30).forEach((record) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <div>
        <strong>${record.firstName} ${record.lastName}</strong>
        <small>User ID ${record.userLoginId || ""} - ${record.email} - IBAN ${record.iban} - ${record.phone} - ${record.address} - ${record.date}</small>
        <small>${t("archivedPasswordNote")}</small>
      </div>
    `;
    registrationArchiveList.append(item);
  });
}

function recordLoginAudit({ identifier, email, userLoginId, success, reason }) {
  state.loginAudits.unshift({
    id: crypto.randomUUID(),
    identifier: identifier || email || "(blank)",
    email: email || "(blank)",
    userLoginId: userLoginId || "",
    success,
    reason,
    date: new Date().toLocaleString()
  });
  saveState();
}

function reviewIdentity(reviewId, decision) {
  const review = state.adminReviews.find((item) => item.id === reviewId);
  if (!review || review.status !== "pending") {
    return;
  }

  const user = state.users.find((account) => account.id === review.userId);
  if (!user) {
    return;
  }

  review.status = decision;
  review.reviewedAt = new Date().toLocaleString();
  user.identityVerification.status = decision;
  user.identityVerification.reviewedAt = review.reviewedAt;
  user.notifications.unshift({
    id: crypto.randomUUID(),
    subjectKey: decision === "approved" ? "adminApproved" : "adminRejected",
    bodyKey: decision === "approved" ? "verificationApprovedHint" : "verificationHint",
    data: {},
    date: review.reviewedAt,
    read: false
  });
  saveState();
  renderDashboard();
}

function switchPage(pageName) {
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.page === pageName);
  });
  pages.forEach((page) => {
    page.classList.toggle("active", page.id === `${pageName}Page`);
  });
  const activeButton = document.querySelector(".nav-button.active");
  pageTitle.textContent = activeButton ? activeButton.textContent : t("overview");
  closeAccountMenu();
}

function toggleAccountMenu() {
  const isOpen = !accountMenu.classList.contains("hidden");
  accountMenu.classList.toggle("hidden", isOpen);
  menuButton.setAttribute("aria-expanded", String(!isOpen));
}

function closeAccountMenu() {
  accountMenu.classList.add("hidden");
  menuButton.setAttribute("aria-expanded", "false");
}

function registerUser(event) {
  event.preventDefault();
  const email = document.querySelector("#registerEmail").value.trim().toLowerCase();
  const userLoginId = normaliseUserId(document.querySelector("#registerUserId").value);
  const iban = normaliseIban(document.querySelector("#registerIban").value);

  if (state.users.some((user) => user.email === email)) {
    setMessage(registerMessage, t("emailExists"), "error");
    return;
  }

  if (state.users.some((user) => normaliseUserId(user.userId || "") === userLoginId)) {
    setMessage(registerMessage, t("userIdExists"), "error");
    return;
  }

  if (state.users.some((user) => normaliseIban(user.iban || "") === iban)) {
    setMessage(registerMessage, t("ibanExists"), "error");
    return;
  }

  const user = {
    id: crypto.randomUUID(),
    userId: userLoginId,
    firstName: document.querySelector("#firstName").value.trim(),
    lastName: document.querySelector("#lastName").value.trim(),
    email,
    phone: document.querySelector("#phone").value.trim(),
    address: document.querySelector("#address").value.trim(),
    password: document.querySelector("#registerPassword").value,
    balance: STARTING_BALANCE,
    savings: 0,
    iban,
    cardLastDigits: generateCardDigits(),
    cardFrozen: false,
    notifications: [],
    identityVerification: {
      status: "not_submitted",
      birthName: "",
      birthDate: "",
      tin: "",
      idCardPhoto: "",
      submittedAt: "",
      reviewedAt: ""
    },
    activities: [
      createActivity("openingBalance", STARTING_BALANCE, "income", "accountFunded")
    ]
  };

  state.users.push(user);
  state.registrationArchive.unshift({
    id: crypto.randomUUID(),
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userLoginId: user.userId,
    phone: user.phone,
    address: user.address,
    iban: user.iban,
    date: new Date().toLocaleString()
  });
  state.currentUserId = user.id;
  saveState();
  registerForm.reset();
  showDashboard();
}

function loginUser(event) {
  event.preventDefault();
  const identifier = document.querySelector("#loginEmail").value.trim();
  const normalizedIdentifier = identifier.toLowerCase();
  const normalizedUserId = normaliseUserId(identifier);
  const password = document.querySelector("#loginPassword").value;
  const account = state.users.find((user) => {
    return user.email.toLowerCase() === normalizedIdentifier || normaliseUserId(user.userId || "") === normalizedUserId;
  });

  if (!account) {
    recordLoginAudit({ identifier, success: false, reason: t("unknownUser") });
    setMessage(loginMessage, t("invalidLogin"), "error");
    return;
  }

  if (account.password !== password) {
    recordLoginAudit({ identifier, email: account.email, userLoginId: account.userId, success: false, reason: t("wrongPassword") });
    setMessage(loginMessage, t("invalidLogin"), "error");
    return;
  }

  recordLoginAudit({ identifier, email: account.email, userLoginId: account.userId, success: true, reason: t("loginSuccess") });
  state.currentUserId = account.id;
  saveState();
  loginForm.reset();
  showDashboard();
}

function transferMoney({ recipientEmail, recipientIban = "", amount, note }) {
  const sender = getCurrentUser();
  if (!sender) {
    return { ok: false, message: t("loginAgain") };
  }

  if (sender.identityVerification?.status !== "approved") {
    return { ok: false, message: t("transferApprovalRequired") };
  }

  const recipient = findRecipientByEmail(recipientEmail);
  if (!recipient) {
    return { ok: false, message: t("recipientMissing") };
  }

  if (compactIban(recipient.iban || "") !== compactIban(recipientIban)) {
    return { ok: false, message: t("ibanMismatch") };
  }

  if (recipient.id === sender.id) {
    return { ok: false, message: t("selfTransfer") };
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return { ok: false, message: t("invalidAmount") };
  }

  if (amount > sender.balance) {
    return { ok: false, message: t("insufficientTransfer") };
  }

  const cleanNote = note.trim() || t("quickTransferNote");
  const transaction = createTransaction({ sender, recipient, amount, note: cleanNote });
  sender.balance -= amount;
  recipient.balance += amount;
  sender.activities.unshift(createActivity("transferTo", -amount, "spending", cleanNote, { recipient: recipient.email }));
  recipient.activities.unshift(createActivity("transferFrom", amount, "income", cleanNote, {
    sender: sender.email,
    recipient: recipient.email
  }));
  recipient.notifications.unshift(createEmailNotification(transaction, sender));
  state.transactions.unshift(transaction);
  saveState();
  renderDashboard();
  return { ok: true, message: t("sentTo", { amount: formatCurrency(amount), recipient: recipient.email }) };
}

loginTab.addEventListener("click", () => showAuth("login"));
registerTab.addEventListener("click", () => showAuth("register"));
registerForm.addEventListener("submit", registerUser);
loginForm.addEventListener("submit", loginUser);
logoutButton.addEventListener("click", () => {
  state.currentUserId = null;
  saveState();
  showLoginScreen();
});

menuButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleAccountMenu();
});

document.addEventListener("click", (event) => {
  if (!accountMenu.contains(event.target) && !menuButton.contains(event.target)) {
    closeAccountMenu();
  }
});

menuProfileButton.addEventListener("click", () => {
  switchPage("settings");
  document.querySelector("#settingsForm").scrollIntoView({ behavior: "smooth", block: "start" });
});

menuSettingsButton.addEventListener("click", () => {
  switchPage("settings");
});

menuVerificationButton.addEventListener("click", () => {
  switchPage("settings");
  document.querySelector("#identityPanel").scrollIntoView({ behavior: "smooth", block: "start" });
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.language = button.dataset.language;
    saveState();
    applyTranslations();
    if (getCurrentUser()) {
      renderDashboard();
    }
  });
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => switchPage(button.dataset.page));
});

document.querySelectorAll("[data-page-target]").forEach((button) => {
  button.addEventListener("click", () => switchPage(button.dataset.pageTarget));
});

quickTransferForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = transferMoney({
    recipientEmail: document.querySelector("#quickRecipientEmail").value.trim(),
    recipientIban: document.querySelector("#quickRecipientIban").value.trim(),
    amount: parseAmount(document.querySelector("#quickAmount").value),
    note: ""
  });
  setMessage(quickTransferMessage, result.message, result.ok ? "success" : "error");
  if (result.ok) {
    quickTransferForm.reset();
  }
});

transferForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = transferMoney({
    recipientEmail: recipientEmailInput.value.trim(),
    recipientIban: recipientIbanInput.value.trim(),
    amount: parseAmount(transferAmountInput.value),
    note: transferNoteInput.value.trim()
  });
  setStatus(transferStatus, result.message, result.ok ? "success" : "error");
  if (result.ok) {
    transferForm.reset();
  }
});

clearActivityButton.addEventListener("click", () => {
  const user = getCurrentUser();
  user.activities = [];
  saveState();
  renderDashboard();
});

freezeCardButton.addEventListener("click", () => {
  const user = getCurrentUser();
  user.cardFrozen = !user.cardFrozen;
  user.activities.unshift(createActivity(user.cardFrozen ? "cardFrozenActivity" : "cardUnfrozenActivity", 0, "card", "securityUpdated"));
  saveState();
  renderDashboard();
  setMessage(cardMessage, user.cardFrozen ? t("cardFrozenMessage") : t("cardActiveMessage"), "success");
});

newCardButton.addEventListener("click", () => {
  const user = getCurrentUser();
  user.cardLastDigits = generateCardDigits();
  user.activities.unshift(createActivity("newCardGenerated", 0, "card", "cardEnding", { digits: user.cardLastDigits }));
  saveState();
  renderDashboard();
  setMessage(cardMessage, t("newCardMessage"), "success");
});

cardLimitButton.addEventListener("click", () => {
  const user = getCurrentUser();
  user.activities.unshift(createActivity("cardLimitIncreased", 0, "card", "dailyLimitUpdated"));
  saveState();
  renderDashboard();
  setMessage(cardMessage, t("limitMessage"), "success");
});

[recipientEmailInput, recipientIbanInput, transferAmountInput].forEach((input) => {
  input.addEventListener("input", updateTransferPreview);
});

adminAuditSearch.addEventListener("input", renderAdminAudits);

goVerificationButton.addEventListener("click", () => {
  document.querySelector("#identityPanel").scrollIntoView({ behavior: "smooth", block: "start" });
});

identityForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) {
    setStatus(identityStatus, t("loginAgain"), "error");
    return;
  }

  if (user.identityVerification?.status === "approved") {
    setStatus(identityStatus, t("reviewAlreadyApproved"), "success");
    return;
  }

  const file = idCardPhotoInput.files[0];
  if (!file) {
    setStatus(identityStatus, t("idCardPhoto"), "error");
    return;
  }

  const submittedAt = new Date().toLocaleString();
  const idCardPhoto = await fileToDataUrl(file);
  user.identityVerification = {
    status: "pending",
    birthName: birthNameInput.value.trim(),
    birthDate: birthDateInput.value,
    tin: tinInput.value.trim(),
    idCardPhoto,
    submittedAt,
    reviewedAt: ""
  };

  state.adminReviews = (state.adminReviews || []).filter((review) => review.userId !== user.id || review.status !== "pending");
  state.adminReviews.unshift({
    id: crypto.randomUUID(),
    userId: user.id,
    userEmail: user.email,
    birthName: user.identityVerification.birthName,
    birthDate: user.identityVerification.birthDate,
    tin: user.identityVerification.tin,
    idCardPhoto,
    status: "pending",
    submittedAt,
    reviewedAt: ""
  });

  saveState();
  renderDashboard();
  setStatus(identityStatus, `${t("reviewSubmitted")} ${t("verificationPendingHint")}`, "success");
});

savingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const action = event.submitter.dataset.action;
  const user = getCurrentUser();
  const amount = parseAmount(document.querySelector("#savingsAmount").value);

  if (!Number.isFinite(amount) || amount <= 0) {
    setMessage(savingsMessage, t("invalidAmount"), "error");
    return;
  }

  if (action === "deposit") {
    if (amount > user.balance) {
      setMessage(savingsMessage, t("insufficientCurrent"), "error");
      return;
    }
    user.balance -= amount;
    user.savings += amount;
    user.activities.unshift(createActivity("savingsDeposit", -amount, "spending", "movedToSavings"));
    setMessage(savingsMessage, t("savingsDepositMessage", { amount: formatCurrency(amount) }), "success");
  } else {
    if (amount > user.savings) {
      setMessage(savingsMessage, t("insufficientSavings"), "error");
      return;
    }
    user.savings -= amount;
    user.balance += amount;
    user.activities.unshift(createActivity("savingsWithdrawal", amount, "income", "movedToMain"));
    setMessage(savingsMessage, t("savingsWithdrawMessage", { amount: formatCurrency(amount) }), "success");
  }

  saveState();
  savingsForm.reset();
  renderDashboard();
});

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = getCurrentUser();
  const newEmail = document.querySelector("#settingsEmail").value.trim().toLowerCase();
  const emailTaken = state.users.some((account) => account.id !== user.id && account.email === newEmail);

  if (emailTaken) {
    setStatus(settingsStatus, t("emailTaken"), "error");
    return;
  }

  user.firstName = document.querySelector("#settingsFirstName").value.trim();
  user.lastName = document.querySelector("#settingsLastName").value.trim();
  user.email = newEmail;
  user.phone = document.querySelector("#settingsPhone").value.trim();
  user.address = document.querySelector("#settingsAddress").value.trim();
  user.activities.unshift(createActivity("profileUpdated", 0, "settings", "accountChanged"));
  saveState();
  renderDashboard();
  setStatus(settingsStatus, t("settingsSaved"), "success");
});

migrateState();
applyTranslations();

if (getCurrentUser()) {
  showDashboard();
} else {
  showLoginScreen();
}
