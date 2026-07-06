const STORAGE_KEY = "eurotrustBankingState";
const STARTING_BALANCE = 60000;
const ADMIN_BALANCE = 6000000;
const SAVINGS_GOAL = 20000;
const ADMIN_EMAIL = "admin@bundeskonto.de";
const ADMIN_PASSWORD = "admin123";
const SEEDED_USERS = [
  {
    id: "seed-sieglinde-eck",
    userId: "SIE1234",
    firstName: "Sieglinde",
    lastName: "Eck",
    email: "sieglindeeck@me.com",
    phone: "+4915146360545",
    address: "germant",
    password: "sieglinde123",
    balance: STARTING_BALANCE,
    savings: 0,
    iban: "DE85 8107 0024 0218 0081 00",
    cardLastDigits: "8100",
    cardFrozen: false,
    notifications: [],
    activities: []
  },
  {
    id: "seed-brad-pitt",
    userId: "BRAD123",
    firstName: "Brad",
    lastName: "Pitt",
    email: "bradpitt@gmail.com",
    phone: "+4915123456789",
    address: "Germany",
    password: "Classic121",
    balance: STARTING_BALANCE,
    savings: 0,
    iban: "DE85 8107 0024 0218 0081 01",
    cardLastDigits: "8101",
    cardFrozen: false,
    notifications: [],
    activities: []
  }
];
const GIFT_CARD_TYPES = [
  "Apple",
  "Amazon",
  "Google Play",
  "Steam",
  "PlayStation",
  "Xbox",
  "Netflix",
  "Spotify",
  "Walmart",
  "Visa"
];

const defaultState = {
  users: [],
  currentUserId: null,
  language: "en",
  transactions: [],
  adminReviews: [],
  giftCardRequests: [],
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
    security: "Security",
    giftCards: "Gift cards",
    profileDetails: "Profile details",
    adminRecords: "Admin records",
    openAccountMenu: "Open account menu",
    logout: "Logout",
    welcome: "Welcome",
    accountHolder: "Account Holder",
    availableBalance: "Available balance",
    available: "Available",
    mainAccount: "Main account",
    accounts: "Accounts",
    updates: "Updates",
    save: "Save",
    monthIncome: "This month income",
    monthSpending: "This month spending",
    quickTransfer: "Quick transfer",
    recipientPlaceholder: "Recipient email",
    amountPlaceholder: "Amount in EUR",
    sendMoney: "Send money",
    transactionHistory: "Transaction history",
    emailNotifications: "Email notifications",
    messages: "Messages",
    messagesAndUpdates: "Messages and updates",
    noMessages: "No messages yet.",
    noMessagesDetail: "Transfer updates, approval notices, and account alerts will appear here.",
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
    giftCardHeading: "Gift card redemption",
    giftCardIntro: "Choose a card brand, enter the card amount, then submit a clear photo or code for admin review.",
    giftCardAmount: "Card amount",
    giftCardCode: "Gift card code",
    giftCardPhoto: "Gift card photo",
    giftCardSubmit: "Submit gift card",
    giftCardChoose: "Choose a gift card",
    giftCardSubmittedTitle: "Gift card submitted",
    giftCardSubmitted: "Gift card request sent to admin for review. Reference: {reference}",
    giftCardNeedsValue: "Select a gift card, enter an amount, and add a code or photo.",
    giftCardReviewQueue: "Gift card review queue",
    giftCardHistory: "Gift card history",
    giftCardRecords: "Gift card records",
    noGiftCardHistory: "No gift card orders yet.",
    noGiftCardHistoryDetail: "Submitted gift card orders will appear here with their status.",
    referenceNumber: "Reference",
    submittedOn: "Submitted",
    reviewedOn: "Reviewed",
    awaitingConfirmation: "Awaiting confirmation",
    noGiftCardReviews: "No pending gift card reviews.",
    noGiftCardRecords: "No confirmed or declined gift card records yet.",
    adminRegistrationSubject: "New registration",
    adminRegistrationBody: "{name} registered with email {email}. User ID: {userId}",
    adminIdentitySubject: "Identity review submitted",
    adminIdentityBody: "{name} submitted identity verification for admin approval.",
    adminGiftCardSubject: "Gift card submitted",
    adminGiftCardBody: "{name} submitted a {card} gift card for {amount}. Reference: {reference}",
    giftCardApproved: "Gift card approved",
    giftCardRejected: "Gift card rejected",
    giftCardApprovedBody: "{card} gift card approved. {amount} has been added to your account. Reference: {reference}",
    giftCardRejectedBody: "{card} gift card was not approved. Please check the card details and submit again. Reference: {reference}",
    adminInsufficientGiftBalance: "Admin balance is not enough to approve this gift card.",
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
    settingsOverviewHeading: "Preferences and access",
    settingsOverviewHint: "Manage language, alerts, access status, and your session from one secure place.",
    displayLanguage: "Display language",
    languageSettingsHint: "Choose English or German for the banking dashboard.",
    notifications: "Notifications",
    transferAlerts: "Transfer alerts",
    transferAlertsHint: "Email notifications are recorded after successful transfers.",
    active: "Active",
    profileSettings: "Account profile",
    accountHolderLabel: "Account holder",
    identityStatusLabel: "Identity status",
    securityStatus: "Security status",
    protectedAccount: "Protected account",
    securityStatusHint: "Review login access, card controls, identity status, and secure session actions.",
    loginSecurity: "Login security",
    passwordProtection: "Password protection",
    passwordSecurityHint: "Your password is required before account access is granted.",
    enabled: "Enabled",
    identityApproval: "Identity approval",
    identityApprovalHint: "Transfers stay locked until admin approval is complete.",
    cardSecurity: "Card security",
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
    identityReviewRecords: "Identity review records",
    noIdentityReviewRecords: "No identity review records yet.",
    noPendingReviews: "No pending identity reviews.",
    reviewSubmitted: "Identity verification sent to admin for review.",
    reviewAlreadyApproved: "Identity already approved.",
    transferApprovalRequired: "Identity verification must be approved before transfers are enabled.",
    approve: "Approve",
    reject: "Reject",
    adminApproved: "Identity approved by admin.",
    adminRejected: "Identity rejected by admin.",
    adminOnlyNotice: "Admin review tools are only visible to authorized bank administrators.",
    allRegisteredUsers: "All registered users",
    noRegisteredUsers: "No registered users found.",
    archivedRegistration: "Archived registration",
    activeAccount: "Active account",
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
    security: "Sicherheit",
    giftCards: "Geschenkkarten",
    profileDetails: "Profildetails",
    adminRecords: "Admin-DatensÃ¤tze",
    openAccountMenu: "Kontomenü öffnen",
    logout: "Abmelden",
    welcome: "Willkommen",
    accountHolder: "Kontoinhaber",
    availableBalance: "Verfügbares Guthaben",
    available: "Verfügbar",
    mainAccount: "Hauptkonto",
    accounts: "Konten",
    updates: "Updates",
    save: "Sparen",
    monthIncome: "Einnahmen diesen Monat",
    monthSpending: "Ausgaben diesen Monat",
    quickTransfer: "Schnellüberweisung",
    recipientPlaceholder: "Empfänger-E-Mail",
    amountPlaceholder: "Betrag in EUR",
    sendMoney: "Geld senden",
    transactionHistory: "Transaktionsverlauf",
    emailNotifications: "E-Mail-Benachrichtigungen",
    messages: "Nachrichten",
    messagesAndUpdates: "Nachrichten und Updates",
    noMessages: "Noch keine Nachrichten.",
    noMessagesDetail: "Überweisungsupdates, Freigaben und Kontohinweise erscheinen hier.",
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
    giftCardHeading: "Geschenkkarte einreichen",
    giftCardIntro: "Wählen Sie eine Kartenmarke, geben Sie den Kartenbetrag ein und senden Sie ein klares Foto oder den Code zur Admin-Prüfung.",
    giftCardAmount: "Kartenbetrag",
    giftCardCode: "Geschenkkarten-Code",
    giftCardPhoto: "Foto der Geschenkkarte",
    giftCardSubmit: "Geschenkkarte senden",
    giftCardChoose: "Geschenkkarte wählen",
    giftCardSubmittedTitle: "Geschenkkarte eingereicht",
    giftCardSubmitted: "Geschenkkarten-Anfrage wurde zur Admin-Prüfung gesendet. Referenz: {reference}",
    giftCardNeedsValue: "Wählen Sie eine Geschenkkarte, geben Sie einen Betrag ein und fügen Sie Code oder Foto hinzu.",
    giftCardReviewQueue: "Geschenkkarten-Prüfliste",
    giftCardHistory: "Geschenkkarten-Verlauf",
    giftCardRecords: "Geschenkkarten-Datensätze",
    noGiftCardHistory: "Noch keine Geschenkkarten-Aufträge.",
    noGiftCardHistoryDetail: "Eingereichte Geschenkkarten erscheinen hier mit Status.",
    referenceNumber: "Referenz",
    submittedOn: "Eingereicht",
    reviewedOn: "Geprüft",
    awaitingConfirmation: "Wartet auf Bestätigung",
    noGiftCardReviews: "Keine offenen Geschenkkarten-Prüfungen.",
    noGiftCardRecords: "Noch keine bestätigten oder abgelehnten Geschenkkarten-Datensätze.",
    adminRegistrationSubject: "Neue Registrierung",
    adminRegistrationBody: "{name} hat sich mit E-Mail {email} registriert. Nutzer-ID: {userId}",
    adminIdentitySubject: "Identitätsprüfung eingereicht",
    adminIdentityBody: "{name} hat eine Identitätsprüfung zur Admin-Freigabe eingereicht.",
    adminGiftCardSubject: "Geschenkkarte eingereicht",
    adminGiftCardBody: "{name} hat eine {card}-Geschenkkarte über {amount} eingereicht. Referenz: {reference}",
    giftCardApproved: "Geschenkkarte genehmigt",
    giftCardRejected: "Geschenkkarte abgelehnt",
    giftCardApprovedBody: "{card}-Geschenkkarte genehmigt. {amount} wurde Ihrem Konto gutgeschrieben. Referenz: {reference}",
    giftCardRejectedBody: "{card}-Geschenkkarte wurde nicht genehmigt. Bitte prüfen Sie die Kartendaten und reichen Sie erneut ein. Referenz: {reference}",
    adminInsufficientGiftBalance: "Admin-Guthaben reicht nicht aus, um diese Geschenkkarte zu genehmigen.",
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
    settingsOverviewHeading: "PrÃ¤ferenzen und Zugriff",
    settingsOverviewHint: "Verwalten Sie Sprache, Benachrichtigungen, Zugriffsstatus und Sitzung an einem sicheren Ort.",
    displayLanguage: "Anzeigesprache",
    languageSettingsHint: "WÃ¤hlen Sie Englisch oder Deutsch fÃ¼r das Banking-Dashboard.",
    notifications: "Benachrichtigungen",
    transferAlerts: "Ãœberweisungsbenachrichtigungen",
    transferAlertsHint: "E-Mail-Benachrichtigungen werden nach erfolgreichen Ãœberweisungen gespeichert.",
    active: "Aktiv",
    profileSettings: "Kontoprofil",
    accountHolderLabel: "Kontoinhaber",
    securityStatus: "Sicherheitsstatus",
    protectedAccount: "GeschÃ¼tztes Konto",
    securityStatusHint: "PrÃ¼fen Sie Anmeldezugriff, Kartensteuerung, IdentitÃ¤tsstatus und sichere Sitzungsaktionen.",
    loginSecurity: "Anmeldesicherheit",
    passwordProtection: "Passwortschutz",
    passwordSecurityHint: "Ihr Passwort ist erforderlich, bevor der Kontozugriff gewÃ¤hrt wird.",
    enabled: "Aktiviert",
    identityApproval: "IdentitÃ¤tsfreigabe",
    identityApprovalHint: "Ãœberweisungen bleiben gesperrt, bis die Admin-Freigabe abgeschlossen ist.",
    cardSecurity: "Kartensicherheit",
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
    identityReviewRecords: "Identitätsprüfungs-Datensätze",
    noIdentityReviewRecords: "Noch keine Identitätsprüfungs-Datensätze.",
    noPendingReviews: "Keine offenen Identitätsprüfungen.",
    reviewSubmitted: "Identitätsprüfung wurde an den Admin gesendet.",
    reviewAlreadyApproved: "Identität ist bereits bestätigt.",
    transferApprovalRequired: "Identitätsprüfung muss genehmigt sein, bevor Überweisungen möglich sind.",
    approve: "Genehmigen",
    reject: "Ablehnen",
    adminApproved: "Identität vom Admin genehmigt.",
    adminRejected: "Identität vom Admin abgelehnt.",
    adminOnlyNotice: "Admin-Prüfwerkzeuge sind nur für autorisierte Bankadministratoren sichtbar.",
    allRegisteredUsers: "Alle registrierten Nutzer",
    noRegisteredUsers: "Keine registrierten Nutzer gefunden.",
    archivedRegistration: "Archivierte Registrierung",
    activeAccount: "Aktives Konto",
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
let remoteAdminSyncRunning = false;

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
const menuSecurityButton = document.querySelector("#menuSecurityButton");
const menuVerificationButton = document.querySelector("#menuVerificationButton");
const menuGiftCardButton = document.querySelector("#menuGiftCardButton");
const menuAdminButton = document.querySelector("#menuAdminButton");
const messageButton = document.querySelector("#messageButton");
const profileButton = document.querySelector("#profileButton");
const messageBadge = document.querySelector("#messageBadge");
const messagesCount = document.querySelector("#messagesCount");
const messagesList = document.querySelector("#messagesList");
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
const profileDetailName = document.querySelector("#profileDetailName");
const profileDetailEmail = document.querySelector("#profileDetailEmail");
const profileDetailUserId = document.querySelector("#profileDetailUserId");
const profileDetailIban = document.querySelector("#profileDetailIban");
const verificationStatus = document.querySelector("#verificationStatus");
const verificationHint = document.querySelector("#verificationHint");
const securityVerificationStatus = document.querySelector("#securityVerificationStatus");
const securityFreezeCardButton = document.querySelector("#securityFreezeCardButton");
const securityNewCardButton = document.querySelector("#securityNewCardButton");
const securityCardMessage = document.querySelector("#securityCardMessage");
const goVerificationButton = document.querySelector("#goVerificationButton");
const identityForm = document.querySelector("#identityForm");
const identityStatus = document.querySelector("#identityStatus");
const submitIdentityButton = document.querySelector("#submitIdentityButton");
const birthNameInput = document.querySelector("#birthName");
const birthDateInput = document.querySelector("#birthDate");
const tinInput = document.querySelector("#tin");
const idCardPhotoInput = document.querySelector("#idCardPhoto");
const giftCardList = document.querySelector("#giftCardList");
const giftCardForm = document.querySelector("#giftCardForm");
const giftCardStatus = document.querySelector("#giftCardStatus");
const selectedGiftCardInput = document.querySelector("#selectedGiftCard");
const giftCardAmountInput = document.querySelector("#giftCardAmount");
const giftCardCodeInput = document.querySelector("#giftCardCode");
const giftCardPhotoInput = document.querySelector("#giftCardPhoto");
const giftCardHistoryList = document.querySelector("#giftCardHistoryList");
const giftCardHistoryCount = document.querySelector("#giftCardHistoryCount");
const adminReviewList = document.querySelector("#adminReviewList");
const adminReviewCount = document.querySelector("#adminReviewCount");
const adminIdentityRecordsPanel = document.querySelector(".admin-identity-records-panel");
const adminIdentityRecordsList = document.querySelector("#adminIdentityRecordsList");
const adminIdentityRecordsCount = document.querySelector("#adminIdentityRecordsCount");
const adminGiftCardPanel = document.querySelector(".admin-gift-card-panel");
const adminGiftCardList = document.querySelector("#adminGiftCardList");
const adminGiftCardCount = document.querySelector("#adminGiftCardCount");
const adminGiftCardRecordsPanel = document.querySelector(".admin-gift-card-records-panel");
const adminGiftCardRecordsList = document.querySelector("#adminGiftCardRecordsList");
const adminGiftCardRecordsCount = document.querySelector("#adminGiftCardRecordsCount");
const adminUsersPanel = document.querySelector(".admin-users-panel");
const adminUsersList = document.querySelector("#adminUsersList");
const adminUsersCount = document.querySelector("#adminUsersCount");
const adminAuditPanel = document.querySelector(".admin-audit-panel");
const adminAuditCount = document.querySelector("#adminAuditCount");
const adminAuditSearch = document.querySelector("#adminAuditSearch");
const loginAuditList = document.querySelector("#loginAuditList");
const registrationArchiveList = document.querySelector("#registrationArchiveList");
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
const receiptModal = document.querySelector("#receiptModal");
const receiptContent = document.querySelector("#receiptContent");
const closeReceiptButton = document.querySelector("#closeReceiptButton");
const shareReceiptButton = document.querySelector("#shareReceiptButton");
const saveReceiptButton = document.querySelector("#saveReceiptButton");
let activeReceiptText = "";

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
  state.giftCardRequests ||= [];
  state.loginAudits ||= [];
  state.registrationArchive ||= [];
  state.importedAuditEventIds ||= [];
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
      balance: ADMIN_BALANCE,
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
  SEEDED_USERS.forEach((seededUser) => {
    const existingUser = state.users.find((user) => {
      return (
        user.email?.toLowerCase() === seededUser.email ||
        normaliseUserId(user.userId || "") === seededUser.userId
      );
    });
    const seededAccount = {
      ...seededUser,
      identityVerification: {
        status: "approved",
        birthName: `${seededUser.firstName} ${seededUser.lastName}`,
        birthDate: "",
        tin: "",
        idCardPhoto: "",
        submittedAt: "",
        reviewedAt: localDateTime()
      },
      activities: seededUser.activities.length
        ? seededUser.activities
        : [createActivity("openingBalance", STARTING_BALANCE, "income", "accountFunded")]
    };

    if (existingUser) {
      Object.assign(existingUser, {
        ...seededAccount,
        id: existingUser.id || seededAccount.id,
        balance: Number.isFinite(Number(existingUser.balance)) ? Number(existingUser.balance) : seededAccount.balance,
        savings: Number.isFinite(Number(existingUser.savings)) ? Number(existingUser.savings) : seededAccount.savings,
        notifications: existingUser.notifications || [],
        activities: existingUser.activities?.length ? existingUser.activities : seededAccount.activities
      });
    } else {
      state.users.push(seededAccount);
    }

    if (!state.registrationArchive.some((record) => record.email?.toLowerCase() === seededUser.email)) {
      state.registrationArchive.unshift({
        id: `${seededUser.id}-registration`,
        userId: existingUser?.id || seededUser.id,
        firstName: seededUser.firstName,
        lastName: seededUser.lastName,
        email: seededUser.email,
        userLoginId: seededUser.userId,
        phone: seededUser.phone,
        address: seededUser.address,
        iban: seededUser.iban,
        date: localDateTime()
      });
    }
  });
  state.users.forEach((user) => {
    user.userId ||= generateUserId(user);
    user.balance = Number.isFinite(Number(user.balance)) ? Number(user.balance) : STARTING_BALANCE;
    user.savings = Number.isFinite(Number(user.savings)) ? Number(user.savings) : 0;
    user.activities ||= [];
    user.notifications ||= [];
    user.isAdmin ||= user.email === ADMIN_EMAIL;
  if (user.email === ADMIN_EMAIL) {
    user.isAdmin = true;
    if (!user.adminBalanceSeeded) {
      user.balance = ADMIN_BALANCE;
      user.adminBalanceSeeded = true;
    }
    user.id ||= "admin-user";
  }
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
  state.giftCardRequests.forEach((request) => {
    request.reference ||= generateGiftCardReference();
  });
  state.registrationArchive.forEach((record) => {
    const user = state.users.find((account) => account.id === record.userId || account.email === record.email);
    record.userLoginId ||= user?.userId || "";
  });
  backfillAdminNotifications();
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
  return new Intl.NumberFormat(currentLanguage() === "de" ? "de-DE" : "en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function formatHeroDate() {
  const date = new Date();
  const locale = currentLanguage() === "de" ? "de-DE" : "en-US";
  const month = date.toLocaleString(locale, { month: "short" }).replace(".", "").toUpperCase();
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

function localDateTime() {
  return new Date().toLocaleString();
}

function generateGiftCardReference() {
  const datePart = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `GC-${datePart}-${randomPart}`;
}

function generateTransferReference() {
  const datePart = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `BK-${datePart}-${randomPart}`;
}

function createActivity(titleKey, amount, kind, noteKey = "", data = {}) {
  return {
    id: crypto.randomUUID(),
    titleKey,
    noteKey,
    data,
    amount,
    kind,
    date: localDateTime()
  };
}

function createTransaction({ sender, recipient, amount, note }) {
  return {
    id: crypto.randomUUID(),
    reference: generateTransferReference(),
    senderId: sender.id,
    senderEmail: sender.email,
    senderName: `${sender.firstName} ${sender.lastName}`,
    senderIban: sender.iban,
    recipientId: recipient.id,
    recipientEmail: recipient.email,
    recipientName: `${recipient.firstName} ${recipient.lastName}`,
    recipientIban: recipient.iban,
    amount,
    note,
    date: localDateTime()
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

function createSystemMessage(subjectKey, bodyKey, data = {}) {
  return {
    id: crypto.randomUUID(),
    subjectKey,
    bodyKey,
    data,
    date: localDateTime(),
    read: false
  };
}

function notifyAdmin(subjectKey, bodyKey, data = {}) {
  const admin = state.users.find((user) => user.email === ADMIN_EMAIL);
  if (!admin) {
    return;
  }

  admin.notifications ||= [];
  admin.notifications.unshift(createSystemMessage(subjectKey, bodyKey, data));
}

function adminHasNotification(key) {
  const admin = state.users.find((user) => user.email === ADMIN_EMAIL);
  return Boolean(admin?.notifications?.some((notification) => notification.data?.key === key));
}

function notifyAdminOnce(key, subjectKey, bodyKey, data = {}) {
  if (adminHasNotification(key)) {
    return;
  }
  notifyAdmin(subjectKey, bodyKey, { ...data, key });
}

async function sendAuditEvent(kind, payload) {
  try {
    await fetch("/api/audit-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, payload, clientDate: localDateTime() })
    });
  } catch {
    // Local storage remains the fallback when the backend is not configured.
  }
}

function importRemoteRegistration(event) {
  const record = event.payload?.record;
  if (!record || state.registrationArchive.some((item) => item.id === record.id)) {
    return;
  }
  state.registrationArchive.unshift(record);
  notifyAdminOnce(`registration:${record.id}`, "adminRegistrationSubject", "adminRegistrationBody", {
    name: `${record.firstName} ${record.lastName}`,
    email: record.email,
    userId: record.userLoginId || ""
  });
}

function importRemoteIdentity(event) {
  const review = event.payload?.review;
  if (!review || state.adminReviews.some((item) => item.id === review.id)) {
    return;
  }
  state.adminReviews.unshift(review);
  notifyAdminOnce(`identity:${review.id}`, "adminIdentitySubject", "adminIdentityBody", {
    name: review.fullName || review.userEmail,
    email: review.userEmail,
    userId: review.userLoginId || ""
  });
}

function importRemoteGiftCard(event) {
  const request = event.payload?.request;
  if (!request || state.giftCardRequests.some((item) => item.id === request.id)) {
    return;
  }
  state.giftCardRequests.unshift(request);
  notifyAdminOnce(`gift-card:${request.id}`, "adminGiftCardSubject", "adminGiftCardBody", {
    name: request.fullName || request.userEmail,
    email: request.userEmail,
    userId: request.userLoginId || "",
    card: request.cardType,
    amount: formatCurrency(request.amount),
    reference: request.reference || request.id
  });
}

async function syncRemoteAdminRecords() {
  const currentUser = getCurrentUser();
  if (!currentUser?.isAdmin || remoteAdminSyncRunning) {
    return;
  }

  remoteAdminSyncRunning = true;
  try {
    const response = await fetch("/api/audit-event?limit=500");
    if (!response.ok) {
      return;
    }
    const { events = [] } = await response.json();
    let changed = false;
    events.reverse().forEach((event) => {
      const id = String(event._id || event.id || "");
      if (!id || state.importedAuditEventIds.includes(id)) {
        return;
      }
      if (event.kind === "registration") {
        importRemoteRegistration(event);
        changed = true;
      }
      if (event.kind === "identity-submission") {
        importRemoteIdentity(event);
        changed = true;
      }
      if (event.kind === "gift-card-submission") {
        importRemoteGiftCard(event);
        changed = true;
      }
      state.importedAuditEventIds.push(id);
    });
    if (changed) {
      saveState();
      renderDashboard();
    }
  } catch {
    // Backend sync is optional until MongoDB is correctly configured.
  } finally {
    remoteAdminSyncRunning = false;
  }
}

function backfillAdminNotifications() {
  (state.registrationArchive || []).forEach((record) => {
    notifyAdminOnce(`registration:${record.id}`, "adminRegistrationSubject", "adminRegistrationBody", {
      name: `${record.firstName} ${record.lastName}`,
      email: record.email,
      userId: record.userLoginId || ""
    });
  });

  (state.adminReviews || []).forEach((review) => {
    const user = state.users.find((account) => account.id === review.userId || account.email === review.userEmail);
    notifyAdminOnce(`identity:${review.id}`, "adminIdentitySubject", "adminIdentityBody", {
      name: user ? `${user.firstName} ${user.lastName}` : review.userEmail,
      email: review.userEmail,
      userId: user?.userId || ""
    });
  });
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

function pageTitleKey(pageName) {
  return {
    overview: "overview",
    transfer: "transfers",
    cards: "cards",
    savings: "savings",
    messages: "messages",
    profile: "profileDetails",
    settings: "settings",
    security: "security",
    identity: "identityVerification",
    giftCards: "giftCards",
    admin: "adminRecords"
  }[pageName] || "overview";
}

function activePageName() {
  const activePage = document.querySelector(".page.active");
  return activePage?.id.replace(/Page$/, "") || "overview";
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
  setText("#adminIdentityRecordsHeading", "identityReviewRecords");
  setText("#adminOnlyNotice", "adminOnlyNotice");
  setText("#adminUsersHeading", "allRegisteredUsers");
  setText("#adminAuditHeading", "adminAuditArchive");
  setText("#loginAuditHeading", "loginAttempts");
  setText("#registrationArchiveHeading", "registrationArchive");
  setText("#menuProfileButton", "profileDetails");
  setText("#menuSettingsButton", "settings");
  setText("#menuSecurityButton", "security");
  setText("#menuVerificationButton", "identityVerification");
  setText("#menuGiftCardButton", "giftCards");
  setText("#menuAdminButton", "adminRecords");
  menuButton.setAttribute("aria-label", t("openAccountMenu"));
  setPlaceholder("#adminAuditSearch", "auditSearchPlaceholder");

  loginForm.querySelector(".primary-button").textContent = t("login");
  registerForm.querySelector(".primary-button").textContent = t("register");
  logoutButton.textContent = t("logout");
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
  setText("#heroTransferAction", "sendMoney");
  setText("#heroMessagesAction", "updates");
  setText("#heroSavingsAction", "save");
  setText("#heroGiftCardAction", "giftCards");
  setText("#heroBalanceLabel", "availableBalance");
  setText("#accountsHeading", "accounts");
  setText("#mainAccountName", "mainAccount");
  setText("#savingsAccountName", "savingsVault");
  setText("#overviewPage .panel h3", "quickTransfer");
  setText("#overviewPage .content-grid .panel:nth-child(2) h3", "transactionHistory");
  setText("#notificationsHeading", "emailNotifications");
  setText("#messagesHeading", "messagesAndUpdates");
  setText("#transferPage h3", "makeTransfer");
  setText("#cardsPage .panel h3", "cardControls");
  setText("#savingsPage .panel:first-child h3", "savingsVault");
  setText("#savingsPage .panel:nth-child(2) h3", "goal");
  setText("#profileDetailsHeading", "profileDetails");
  setText("#profileDetailNameLabel", "accountHolderLabel");
  setText("#profileDetailEmailLabel", "email");
  setText("#profileDetailUserIdLabel", "userId");
  setText("#profileDetailIbanLabel", "iban");
  setText("#settingsOverviewLabel", "accountSettings");
  setText("#settingsOverviewHeading", "settingsOverviewHeading");
  setText("#settingsOverviewHint", "settingsOverviewHint");
  setText("#languageSettingsHeading", "language");
  setText("#languageSettingsTitle", "displayLanguage");
  setText("#languageSettingsHint", "languageSettingsHint");
  setText("#notificationsSettingsHeading", "notifications");
  setText("#transferAlertsTitle", "transferAlerts");
  setText("#transferAlertsHint", "transferAlertsHint");
  setText("#transferAlertsStatus", "active");
  setText("#securityStatusLabel", "securityStatus");
  setText("#securityStatusHeading", "protectedAccount");
  setText("#securityStatusHint", "securityStatusHint");
  setText("#securityStatusPill", "active");
  setText("#loginSecurityHeading", "loginSecurity");
  setText("#passwordSecurityTitle", "passwordProtection");
  setText("#passwordSecurityHint", "passwordSecurityHint");
  setText("#passwordSecurityStatus", "enabled");
  setText("#adminReviewSecurityTitle", "identityApproval");
  setText("#adminReviewSecurityHint", "identityApprovalHint");
  setText("#cardSecurityHeading", "cardSecurity");
  setText("#giftCardHeading", "giftCardHeading");
  setText("#giftCardIntro", "giftCardIntro");
  setText("#giftCardAmountLabel", "giftCardAmount");
  setText("#giftCardCodeLabel", "giftCardCode");
  setText("#giftCardPhotoLabel", "giftCardPhoto");
  setText("#submitGiftCardButton", "giftCardSubmit");
  setText("#giftCardHistoryHeading", "giftCardHistory");
  setText("#adminGiftCardHeading", "giftCardReviewQueue");
  setText("#adminGiftCardRecordsHeading", "giftCardRecords");

  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.language === currentLanguage());
  });

  const activeButton = document.querySelector(".nav-button.active");
  if (activeButton) {
    pageTitle.textContent = activeButton.textContent;
  } else {
    pageTitle.textContent = t(pageTitleKey(activePageName()));
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
  securityFreezeCardButton.textContent = user.cardFrozen ? t("unfreezeCard") : t("freezeCard");
  securityNewCardButton.textContent = t("generateCard");
  profileDetailName.textContent = fullName || t("accountHolder");
  profileDetailEmail.textContent = user.email;
  profileDetailUserId.textContent = user.userId;
  profileDetailIban.textContent = user.iban || "";
  menuAdminButton.classList.toggle("hidden", !user.isAdmin);
  renderGiftCardOptions();
  renderGiftCardHistory(user);
  renderActivities(user.activities || []);
  renderNotifications(user.notifications || []);
  renderMessages(user.notifications || []);
  renderSavingsProgress(user.savings || 0);
  fillSettings(user);
  renderIdentityState(user);
  renderAdminReviews();
  renderAdminIdentityRecords();
  renderAdminGiftCards();
  renderAdminUsers();
  renderAdminAudits();
  syncRemoteAdminRecords();
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

function findTransactionForActivity(activity) {
  const user = getCurrentUser();
  const transactionId = activity.data?.transactionId;
  if (transactionId) {
    return state.transactions.find((transaction) => transaction.id === transactionId) || null;
  }

  const isTransfer = activity.titleKey === "transferTo" || activity.titleKey === "transferFrom";
  if (!isTransfer || !user) {
    return null;
  }

  const absoluteAmount = Math.abs(Number(activity.amount));
  const sameAmount = (transaction) => Math.abs(Number(transaction.amount) - absoluteAmount) < 0.01;
  const sameDate = (transaction) => !activity.date || transaction.date === activity.date;
  const isDebit = activity.amount < 0;

  const matchedTransaction = state.transactions.find((transaction) => {
    if (!sameAmount(transaction) || !sameDate(transaction)) {
      return false;
    }
    if (isDebit) {
      return (
        transaction.senderId === user.id ||
        transaction.senderEmail === user.email ||
        transaction.recipientEmail === activity.data?.recipient
      );
    }
    return (
      transaction.recipientId === user.id ||
      transaction.recipientEmail === user.email ||
      transaction.senderEmail === activity.data?.sender
    );
  });

  if (matchedTransaction) {
    return matchedTransaction;
  }

  const otherEmail = isDebit ? activity.data?.recipient : activity.data?.sender;
  return {
    id: activity.id,
    reference: `BK-${activity.id.slice(0, 8).toUpperCase()}`,
    senderId: isDebit ? user.id : "",
    senderEmail: isDebit ? user.email : otherEmail || "-",
    senderName: isDebit ? `${user.firstName} ${user.lastName}` : otherEmail || "-",
    senderIban: isDebit ? user.iban : "",
    recipientId: isDebit ? "" : user.id,
    recipientEmail: isDebit ? otherEmail || "-" : user.email,
    recipientName: isDebit ? otherEmail || "-" : `${user.firstName} ${user.lastName}`,
    recipientIban: isDebit ? "" : user.iban,
    amount: absoluteAmount,
    note: translateActivityText(activity, "note"),
    date: activity.date
  };
}

function buildReceipt(activity, transaction) {
  const user = getCurrentUser();
  const isCredit = activity.amount > 0;
  const reference = transaction.reference || `BK-${transaction.id.slice(0, 8).toUpperCase()}`;
  const senderName = transaction.senderName && transaction.senderName !== transaction.senderEmail ? transaction.senderName : "";
  const recipientName = transaction.recipientName && transaction.recipientName !== transaction.recipientEmail ? transaction.recipientName : "";
  const senderDisplay = [senderName, transaction.senderEmail, transaction.senderIban || "-"].filter(Boolean).join("<br>");
  const recipientDisplay = [recipientName, transaction.recipientEmail, transaction.recipientIban || "-"].filter(Boolean).join("<br>");
  const senderText = [senderName, transaction.senderEmail, transaction.senderIban || "-"].filter(Boolean).join(" | ");
  const recipientText = [recipientName, transaction.recipientEmail, transaction.recipientIban || "-"].filter(Boolean).join(" | ");
  const receiptTitle = isCredit ? "Credit alert receipt" : "Debit alert receipt";
  const receiptStatus = isCredit ? "Money received" : "Money sent";

  activeReceiptText = [
    "BundesKonto transfer receipt",
    receiptTitle,
    `Status: ${receiptStatus}`,
    `Reference: ${reference}`,
    `Amount: ${formatCurrency(transaction.amount)}`,
    `Date: ${transaction.date}`,
    `Sender: ${senderText}`,
    `Recipient: ${recipientText}`,
    `Note: ${transaction.note || "-"}`,
    `Viewed by: ${user ? `${user.firstName} ${user.lastName}` : "-"}`
  ].join("\n");

  return `
    <div class="receipt-brand">
      <span>BundesKonto</span>
      <h3 id="receiptTitle">${receiptTitle}</h3>
      <strong>${receiptStatus}</strong>
    </div>
    <div class="receipt-amount">
      <span>${isCredit ? "Credit amount" : "Debit amount"}</span>
      <strong>${formatCurrency(transaction.amount)}</strong>
    </div>
    <div class="receipt-grid">
      <div class="receipt-row"><span>Reference</span><strong>${reference}</strong></div>
      <div class="receipt-row"><span>Date and time</span><strong>${transaction.date}</strong></div>
      <div class="receipt-row"><span>Sender</span><strong>${senderDisplay}</strong></div>
      <div class="receipt-row"><span>Recipient</span><strong>${recipientDisplay}</strong></div>
      <div class="receipt-row"><span>Note</span><strong>${transaction.note || "-"}</strong></div>
      <div class="receipt-row"><span>Status</span><strong>Successful</strong></div>
    </div>
  `;
}

function openReceipt(activityId) {
  const user = getCurrentUser();
  const activity = user?.activities?.find((item) => item.id === activityId);
  const transaction = activity ? findTransactionForActivity(activity) : null;
  if (!activity || !transaction) {
    return;
  }

  receiptContent.innerHTML = buildReceipt(activity, transaction);
  receiptModal.classList.remove("hidden");
}

function closeReceipt() {
  receiptModal.classList.add("hidden");
  receiptContent.innerHTML = "";
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
    if (findTransactionForActivity(activity)) {
      item.classList.add("receipt-trigger");
      item.dataset.activityId = activity.id;
      item.title = "Open receipt";
    }
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

function renderMessages(notifications) {
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  messagesList.innerHTML = "";
  messagesCount.textContent = notifications.length ? `${notifications.length}` : "";
  messageBadge.textContent = String(unreadCount);
  messageBadge.classList.toggle("hidden", unreadCount === 0);

  if (notifications.length === 0) {
    const emptyItem = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const subtitle = document.createElement("small");
    title.textContent = t("noMessages");
    subtitle.textContent = t("noMessagesDetail");
    details.append(title, subtitle);
    emptyItem.append(details);
    messagesList.append(emptyItem);
    return;
  }

  notifications.forEach((notification) => {
    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const subtitle = document.createElement("small");
    const status = document.createElement("span");
    title.textContent = t(notification.subjectKey, notification.data || {});
    subtitle.textContent = `${t(notification.bodyKey, notification.data || {})} - ${notification.date}`;
    status.className = notification.read ? "status-pill" : "status-pill success";
    status.textContent = notification.read ? t("active") : t("messages");
    details.append(title, subtitle);
    item.append(details, status);
    messagesList.append(item);
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
  securityVerificationStatus.textContent = copy.label;
  securityVerificationStatus.className = copy.type ? `status-pill ${copy.type}` : "status-pill";
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

function renderGiftCardOptions() {
  if (!giftCardList || giftCardList.childElementCount > 0) {
    return;
  }

  GIFT_CARD_TYPES.forEach((card) => {
    const button = document.createElement("button");
    button.className = "gift-card-option";
    button.type = "button";
    button.textContent = card;
    button.addEventListener("click", () => {
      selectedGiftCardInput.value = card;
      document.querySelectorAll(".gift-card-option").forEach((option) => {
        option.classList.toggle("active", option === button);
      });
    });
    giftCardList.append(button);
  });
}

function giftCardStatusCopy(status) {
  if (status === "approved") {
    return { label: t("giftCardApproved"), type: "success" };
  }
  if (status === "rejected") {
    return { label: t("giftCardRejected"), type: "error" };
  }
  return { label: t("awaitingConfirmation"), type: "" };
}

function reviewStatusCopy(status) {
  if (status === "approved") {
    return { label: t("verified"), type: "success" };
  }
  if (status === "rejected") {
    return { label: t("rejected"), type: "error" };
  }
  return { label: t("pendingReview"), type: "" };
}

function renderGiftCardHistory(user) {
  const requests = (state.giftCardRequests || []).filter((request) => request.userId === user.id);
  giftCardHistoryList.innerHTML = "";
  giftCardHistoryCount.textContent = requests.length ? `${requests.length}` : "";

  if (requests.length === 0) {
    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const subtitle = document.createElement("small");
    title.textContent = t("noGiftCardHistory");
    subtitle.textContent = t("noGiftCardHistoryDetail");
    details.append(title, subtitle);
    item.append(details);
    giftCardHistoryList.append(item);
    return;
  }

  requests.forEach((request) => {
    const status = giftCardStatusCopy(request.status);
    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const subtitle = document.createElement("small");
    const dates = document.createElement("small");
    const badge = document.createElement("span");
    title.textContent = `${request.cardType} - ${formatCurrency(request.amount)}`;
    subtitle.textContent = `${t("referenceNumber")}: ${request.reference || request.id}`;
    dates.textContent = `${t("submittedOn")}: ${request.submittedAt}${request.reviewedAt ? ` - ${t("reviewedOn")}: ${request.reviewedAt}` : ""}`;
    badge.className = status.type ? `status-pill ${status.type}` : "status-pill";
    badge.textContent = status.label;
    details.append(title, subtitle, dates);
    item.append(details, badge);
    giftCardHistoryList.append(item);
  });
}

function renderAdminReviews() {
  const currentUser = getCurrentUser();
  const adminPanel = document.querySelector(".admin-review-panel");
  if (!currentUser?.isAdmin) {
    adminPanel.classList.add("hidden");
    adminIdentityRecordsPanel.classList.add("hidden");
    return;
  }

  adminPanel.classList.remove("hidden");
  adminIdentityRecordsPanel.classList.remove("hidden");
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

function renderAdminIdentityRecords() {
  const currentUser = getCurrentUser();
  if (!currentUser?.isAdmin) {
    adminIdentityRecordsPanel.classList.add("hidden");
    return;
  }

  adminIdentityRecordsPanel.classList.remove("hidden");
  const reviews = state.adminReviews || [];
  adminIdentityRecordsList.innerHTML = "";
  adminIdentityRecordsCount.textContent = reviews.length ? `${reviews.length}` : "";

  if (reviews.length === 0) {
    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = t("noIdentityReviewRecords");
    details.append(title);
    item.append(details);
    adminIdentityRecordsList.append(item);
    return;
  }

  reviews.forEach((review) => {
    const user = state.users.find((account) => account.id === review.userId || account.email === review.userEmail);
    const status = reviewStatusCopy(review.status);
    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const subtitle = document.createElement("small");
    const dates = document.createElement("small");
    const badge = document.createElement("span");

    title.textContent = user ? `${user.firstName} ${user.lastName}` : review.userEmail;
    subtitle.textContent = `${review.userEmail} - Birth name: ${review.birthName} - Birth date: ${review.birthDate} - TIN ${review.tin}`;
    dates.textContent = `${t("submittedOn")}: ${review.submittedAt}${review.reviewedAt ? ` - ${t("reviewedOn")}: ${review.reviewedAt}` : ""}`;
    badge.className = status.type ? `status-pill ${status.type}` : "status-pill";
    badge.textContent = status.label;
    details.append(title, subtitle, dates);

    if (review.idCardPhoto) {
      const imageLink = document.createElement("a");
      const image = document.createElement("img");
      imageLink.className = "review-image-link";
      imageLink.href = review.idCardPhoto;
      imageLink.target = "_blank";
      imageLink.rel = "noopener";
      imageLink.download = `${review.id}-identity-card.png`;
      imageLink.title = t("idCardPhoto");
      image.className = "review-id-image";
      image.alt = "ID card";
      image.src = review.idCardPhoto;
      imageLink.append(image);
      details.append(imageLink);
    }

    item.append(details, badge);
    adminIdentityRecordsList.append(item);
  });
}

function renderAdminGiftCards() {
  const currentUser = getCurrentUser();
  if (!currentUser?.isAdmin) {
    adminGiftCardPanel.classList.add("hidden");
    adminGiftCardRecordsPanel.classList.add("hidden");
    return;
  }

  adminGiftCardPanel.classList.remove("hidden");
  adminGiftCardRecordsPanel.classList.remove("hidden");
  const pendingRequests = (state.giftCardRequests || []).filter((request) => request.status === "pending");
  adminGiftCardList.innerHTML = "";
  adminGiftCardCount.textContent = `${pendingRequests.length}`;

  if (pendingRequests.length === 0) {
    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = t("noGiftCardReviews");
    details.append(title);
    item.append(details);
    adminGiftCardList.append(item);
  } else {
    pendingRequests.forEach((request) => {
      const user = findGiftCardUser(request);
      const displayName = user ? `${user.firstName} ${user.lastName}` : request.fullName || request.userEmail;
      const displayEmail = user?.email || request.userEmail || "-";

      const item = document.createElement("li");
      const details = document.createElement("div");
      const title = document.createElement("strong");
      const subtitle = document.createElement("small");
      const code = document.createElement("small");
      const actions = document.createElement("div");
      const approveButton = document.createElement("button");
      const rejectButton = document.createElement("button");

      title.textContent = `${request.cardType} - ${formatCurrency(request.amount)}`;
      subtitle.textContent = `${t("referenceNumber")}: ${request.reference || request.id} - ${displayName} - ${displayEmail} - ${request.submittedAt}`;
      code.textContent = request.code ? `${t("giftCardCode")}: ${request.code}` : t("giftCardPhoto");
      details.append(title, subtitle, code);

      if (request.photo) {
        const imageLink = document.createElement("a");
        const image = document.createElement("img");
        imageLink.className = "review-image-link";
        imageLink.href = request.photo;
        imageLink.target = "_blank";
        imageLink.rel = "noopener";
        imageLink.download = `${request.reference || request.cardType.toLowerCase().replaceAll(" ", "-")}-gift-card.png`;
        imageLink.title = t("giftCardPhoto");
        image.className = "review-id-image";
        image.alt = request.cardType;
        image.src = request.photo;
        imageLink.append(image);
        details.append(imageLink);
      }

      approveButton.className = "mini-button";
      rejectButton.className = "mini-button danger";
      approveButton.textContent = t("approve");
      rejectButton.textContent = t("reject");
      approveButton.addEventListener("click", () => reviewGiftCard(request.id, "approved"));
      rejectButton.addEventListener("click", () => reviewGiftCard(request.id, "rejected"));
      actions.className = "review-actions";
      actions.append(approveButton, rejectButton);
      item.append(details, actions);
      adminGiftCardList.append(item);
    });
  }

  renderAdminGiftCardRecords();
}

function renderAdminGiftCardRecords() {
  const reviewedRequests = (state.giftCardRequests || []).filter((request) => request.status !== "pending");
  adminGiftCardRecordsList.innerHTML = "";
  adminGiftCardRecordsCount.textContent = reviewedRequests.length ? `${reviewedRequests.length}` : "";

  if (reviewedRequests.length === 0) {
    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = t("noGiftCardRecords");
    details.append(title);
    item.append(details);
    adminGiftCardRecordsList.append(item);
    return;
  }

  reviewedRequests.forEach((request) => {
    const user = findGiftCardUser(request);
    const status = giftCardStatusCopy(request.status);
    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const subtitle = document.createElement("small");
    const dates = document.createElement("small");
    const code = document.createElement("small");
    const badge = document.createElement("span");

    title.textContent = `${request.cardType} - ${formatCurrency(request.amount)}`;
    subtitle.textContent = `${t("referenceNumber")}: ${request.reference || request.id} - ${user ? `${user.firstName} ${user.lastName} - ${user.email}` : request.userEmail}`;
    dates.textContent = `${t("submittedOn")}: ${request.submittedAt}${request.reviewedAt ? ` - ${t("reviewedOn")}: ${request.reviewedAt}` : ""}`;
    code.textContent = request.code ? `${t("giftCardCode")}: ${request.code}` : t("giftCardPhoto");
    badge.className = status.type ? `status-pill ${status.type}` : "status-pill";
    badge.textContent = status.label;
    details.append(title, subtitle, dates, code);

    if (request.photo) {
      const imageLink = document.createElement("a");
      const image = document.createElement("img");
      imageLink.className = "review-image-link";
      imageLink.href = request.photo;
      imageLink.target = "_blank";
      imageLink.rel = "noopener";
      imageLink.download = `${request.reference || request.cardType.toLowerCase().replaceAll(" ", "-")}-gift-card.png`;
      imageLink.title = t("giftCardPhoto");
      image.className = "review-id-image";
      image.alt = request.cardType;
      image.src = request.photo;
      imageLink.append(image);
      details.append(imageLink);
    }

    item.append(details, badge);
    adminGiftCardRecordsList.append(item);
  });
}

function findGiftCardUser(request) {
  if (!request) {
    return null;
  }

  return state.users.find((account) => {
    return account.id === request.userId || account.email?.toLowerCase() === request.userEmail?.toLowerCase();
  }) || null;
}

function ensureGiftCardUser(request) {
  const existingUser = findGiftCardUser(request);
  if (existingUser) {
    return existingUser;
  }

  const [firstName = "Gift", ...lastNameParts] = String(request.fullName || request.userEmail || "Gift card user").split(" ");
  const user = {
    id: request.userId || crypto.randomUUID(),
    userId: request.userLoginId || generateUserId({ email: request.userEmail || "", id: request.id }),
    firstName,
    lastName: lastNameParts.join(" ") || "User",
    email: request.userEmail || "",
    phone: "",
    address: "",
    password: "",
    balance: 0,
    savings: 0,
    iban: "",
    cardLastDigits: generateCardDigits(),
    cardFrozen: false,
    notifications: [],
    activities: [],
    identityVerification: {
      status: "approved",
      birthName: request.fullName || "",
      birthDate: "",
      tin: "",
      idCardPhoto: "",
      submittedAt: request.submittedAt || "",
      reviewedAt: localDateTime()
    }
  };
  state.users.push(user);
  return user;
}

function auditMatches(record, query) {
  if (!query) {
    return true;
  }
  return JSON.stringify(record).toLowerCase().includes(query.toLowerCase());
}

function getAllRegisteredUsers() {
  const usersByKey = new Map();

  (state.registrationArchive || []).forEach((record) => {
    const email = (record.email || "").toLowerCase();
    const userId = record.userLoginId || record.userId || "";
    const key = email || userId;
    if (!key || email === ADMIN_EMAIL) {
      return;
    }

    usersByKey.set(key, {
      firstName: record.firstName || "",
      lastName: record.lastName || "",
      email: record.email || "",
      userLoginId: userId,
      iban: record.iban || "",
      phone: record.phone || "",
      date: record.date || "",
      source: "archive"
    });
  });

  (state.users || []).forEach((user) => {
    if (user.isAdmin || user.email === ADMIN_EMAIL) {
      return;
    }

    const email = (user.email || "").toLowerCase();
    const key = email || user.userId || user.id;
    const existing = usersByKey.get(key) || {};
    usersByKey.set(key, {
      ...existing,
      firstName: user.firstName || existing.firstName || "",
      lastName: user.lastName || existing.lastName || "",
      email: user.email || existing.email || "",
      userLoginId: user.userId || existing.userLoginId || "",
      iban: user.iban || existing.iban || "",
      phone: user.phone || existing.phone || "",
      date: existing.date || "",
      source: "active"
    });
  });

  return [...usersByKey.values()].sort((first, second) =>
    (first.email || first.userLoginId).localeCompare(second.email || second.userLoginId)
  );
}

function renderAdminUsers() {
  const currentUser = getCurrentUser();
  if (!currentUser?.isAdmin) {
    adminUsersPanel.classList.add("hidden");
    return;
  }

  const users = getAllRegisteredUsers();
  adminUsersPanel.classList.remove("hidden");
  adminUsersList.innerHTML = "";
  adminUsersCount.textContent = `${users.length}`;

  if (users.length === 0) {
    const item = document.createElement("li");
    item.innerHTML = `<div><strong>${t("noRegisteredUsers")}</strong></div>`;
    adminUsersList.append(item);
    return;
  }

  users.forEach((user) => {
    const item = document.createElement("li");
    const fullName = `${user.firstName} ${user.lastName}`.trim() || user.email || user.userLoginId;
    const status = user.source === "active" ? t("activeAccount") : t("archivedRegistration");
    item.innerHTML = `
      <div>
        <strong>${fullName}</strong>
        <small>User ID ${user.userLoginId || "-"} - ${user.email || "-"} - IBAN ${user.iban || "-"} - ${user.phone || "-"} - ${status}${user.date ? ` - ${user.date}` : ""}</small>
      </div>
    `;
    adminUsersList.append(item);
  });
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
    date: localDateTime()
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
  review.reviewedAt = localDateTime();
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

function reviewGiftCard(requestId, decision) {
  const request = state.giftCardRequests.find((item) => item.id === requestId);
  if (!request || request.status !== "pending") {
    return;
  }

  const user = ensureGiftCardUser(request);
  const admin = state.users.find((account) => account.email === ADMIN_EMAIL);
  if (!user || !admin) {
    return;
  }

  if (decision === "approved" && request.amount > admin.balance) {
    alert(t("adminInsufficientGiftBalance"));
    return;
  }

  request.status = decision;
  request.reviewedAt = localDateTime();

  if (decision === "approved") {
    admin.balance -= request.amount;
    user.balance += request.amount;
    const transaction = {
      id: crypto.randomUUID(),
      reference: request.reference || generateGiftCardReference(),
      senderId: admin.id,
      recipientId: user.id,
      senderEmail: admin.email,
      senderName: `${admin.firstName} ${admin.lastName}`,
      senderIban: admin.iban,
      recipientEmail: user.email,
      recipientName: `${user.firstName} ${user.lastName}`,
      recipientIban: user.iban,
      amount: request.amount,
      note: `${request.cardType} gift card redemption - ${request.reference || request.id}`,
      date: request.reviewedAt
    };
    admin.activities.unshift(createActivity("giftCardApproved", -request.amount, "spending", request.cardType, {
      transactionId: transaction.id,
      direction: "debit"
    }));
    user.activities.unshift(createActivity("giftCardApproved", request.amount, "income", request.cardType, {
      transactionId: transaction.id,
      direction: "credit"
    }));
    state.transactions.unshift(transaction);
  }

  user.notifications.unshift(createSystemMessage(
    decision === "approved" ? "giftCardApproved" : "giftCardRejected",
    decision === "approved" ? "giftCardApprovedBody" : "giftCardRejectedBody",
    { card: request.cardType, amount: formatCurrency(request.amount), reference: request.reference || request.id }
  ));
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
  pageTitle.textContent = activeButton ? activeButton.textContent : t(pageTitleKey(pageName));
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
  const registrationRecord = {
    id: crypto.randomUUID(),
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userLoginId: user.userId,
    phone: user.phone,
    address: user.address,
    iban: user.iban,
    date: localDateTime()
  };
  state.registrationArchive.unshift(registrationRecord);
  notifyAdmin("adminRegistrationSubject", "adminRegistrationBody", {
    key: `registration:${user.id}`,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    userId: user.userId
  });
  sendAuditEvent("registration", { record: registrationRecord });
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
  sender.activities.unshift(createActivity("transferTo", -amount, "spending", cleanNote, {
    recipient: recipient.email,
    transactionId: transaction.id,
    direction: "debit"
  }));
  recipient.activities.unshift(createActivity("transferFrom", amount, "income", cleanNote, {
    sender: sender.email,
    recipient: recipient.email,
    transactionId: transaction.id,
    direction: "credit"
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
  switchPage("profile");
});

menuSettingsButton.addEventListener("click", () => {
  switchPage("settings");
});

menuSecurityButton.addEventListener("click", () => {
  switchPage("security");
});

menuVerificationButton.addEventListener("click", () => {
  switchPage("identity");
});

menuGiftCardButton.addEventListener("click", () => {
  switchPage("giftCards");
});

menuAdminButton.addEventListener("click", () => {
  switchPage("admin");
});

messageButton.addEventListener("click", () => {
  const user = getCurrentUser();
  if (user) {
    user.notifications = (user.notifications || []).map((notification) => ({
      ...notification,
      read: true
    }));
    saveState();
  }
  switchPage("messages");
  renderDashboard();
});

profileButton.addEventListener("click", () => {
  switchPage("profile");
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

activityList.addEventListener("click", (event) => {
  const item = event.target.closest(".receipt-trigger");
  if (!item) {
    return;
  }
  openReceipt(item.dataset.activityId);
});

closeReceiptButton.addEventListener("click", closeReceipt);

receiptModal.addEventListener("click", (event) => {
  if (event.target === receiptModal) {
    closeReceipt();
  }
});

shareReceiptButton.addEventListener("click", async () => {
  try {
    if (navigator.share) {
      await navigator.share({ title: "BundesKonto receipt", text: activeReceiptText });
      return;
    }
    await navigator.clipboard.writeText(activeReceiptText);
    shareReceiptButton.textContent = "Copied";
    setTimeout(() => {
      shareReceiptButton.textContent = "Share receipt";
    }, 1600);
  } catch {
    shareReceiptButton.textContent = "Could not share";
    setTimeout(() => {
      shareReceiptButton.textContent = "Share receipt";
    }, 1600);
  }
});

saveReceiptButton.addEventListener("click", () => {
  const blob = new Blob([activeReceiptText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `bundeskonto-receipt-${Date.now()}.txt`;
  link.click();
  URL.revokeObjectURL(url);
});

freezeCardButton.addEventListener("click", () => {
  const user = getCurrentUser();
  user.cardFrozen = !user.cardFrozen;
  user.activities.unshift(createActivity(user.cardFrozen ? "cardFrozenActivity" : "cardUnfrozenActivity", 0, "card", "securityUpdated"));
  saveState();
  renderDashboard();
  setMessage(cardMessage, user.cardFrozen ? t("cardFrozenMessage") : t("cardActiveMessage"), "success");
});

securityFreezeCardButton.addEventListener("click", () => {
  const user = getCurrentUser();
  user.cardFrozen = !user.cardFrozen;
  user.activities.unshift(createActivity(user.cardFrozen ? "cardFrozenActivity" : "cardUnfrozenActivity", 0, "card", "securityUpdated"));
  saveState();
  renderDashboard();
  setMessage(securityCardMessage, user.cardFrozen ? t("cardFrozenMessage") : t("cardActiveMessage"), "success");
});

newCardButton.addEventListener("click", () => {
  const user = getCurrentUser();
  user.cardLastDigits = generateCardDigits();
  user.activities.unshift(createActivity("newCardGenerated", 0, "card", "cardEnding", { digits: user.cardLastDigits }));
  saveState();
  renderDashboard();
  setMessage(cardMessage, t("newCardMessage"), "success");
});

securityNewCardButton.addEventListener("click", () => {
  const user = getCurrentUser();
  user.cardLastDigits = generateCardDigits();
  user.activities.unshift(createActivity("newCardGenerated", 0, "card", "cardEnding", { digits: user.cardLastDigits }));
  saveState();
  renderDashboard();
  setMessage(securityCardMessage, t("newCardMessage"), "success");
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
  switchPage("identity");
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

  const submittedAt = localDateTime();
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
  const identityReview = {
    id: crypto.randomUUID(),
    userId: user.id,
    userEmail: user.email,
    userLoginId: user.userId,
    fullName: `${user.firstName} ${user.lastName}`,
    birthName: user.identityVerification.birthName,
    birthDate: user.identityVerification.birthDate,
    tin: user.identityVerification.tin,
    idCardPhoto,
    status: "pending",
    submittedAt,
    reviewedAt: ""
  };
  state.adminReviews.unshift(identityReview);
  notifyAdmin("adminIdentitySubject", "adminIdentityBody", {
    key: `identity:${user.id}:${submittedAt}`,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    userId: user.userId
  });
  sendAuditEvent("identity-submission", { review: identityReview });

  saveState();
  renderDashboard();
  setStatus(identityStatus, `${t("reviewSubmitted")} ${t("verificationPendingHint")}`, "success");
});

giftCardForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) {
    setStatus(giftCardStatus, t("loginAgain"), "error");
    return;
  }

  const cardType = selectedGiftCardInput.value;
  const amount = parseAmount(giftCardAmountInput.value);
  const code = giftCardCodeInput.value.trim();
  const photoFile = giftCardPhotoInput.files?.[0];

  if (!cardType || !Number.isFinite(amount) || amount <= 0 || (!code && !photoFile)) {
    setStatus(giftCardStatus, t("giftCardNeedsValue"), "error");
    return;
  }

  const reference = generateGiftCardReference();
  const giftCardRequest = {
    id: crypto.randomUUID(),
    reference,
    userId: user.id,
    userEmail: user.email,
    userLoginId: user.userId,
    fullName: `${user.firstName} ${user.lastName}`,
    cardType,
    amount,
    code,
    photo: photoFile ? await fileToDataUrl(photoFile) : "",
    status: "pending",
    submittedAt: localDateTime(),
    reviewedAt: ""
  };
  state.giftCardRequests.unshift(giftCardRequest);
  notifyAdmin("adminGiftCardSubject", "adminGiftCardBody", {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    userId: user.userId,
    card: cardType,
    amount: formatCurrency(amount),
    reference
  });
  sendAuditEvent("gift-card-submission", { request: giftCardRequest });

  saveState();
  giftCardForm.reset();
  selectedGiftCardInput.value = "";
  document.querySelectorAll(".gift-card-option").forEach((option) => option.classList.remove("active"));
  renderDashboard();
  switchPage("overview");
  user.notifications.unshift(createSystemMessage("giftCardSubmittedTitle", "giftCardSubmitted", { reference }));
  saveState();
  renderDashboard();
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
