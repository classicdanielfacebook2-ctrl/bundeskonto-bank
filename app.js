import { initInterfaceEnhancements } from "./src/ui-enhancements.js";

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

const RECEIVE_ACCOUNT_DETAILS = {
  EUR: {
    code: "EUR",
    title: "Receive EUR",
    subtitlePrefix: "From SEPA and",
    subtitleLink: "100+ countries",
    flagClass: "flag-eur",
    fields: [
      { label: "Name", value: "accountName" },
      { label: "IBAN", value: "userIban", hint: "Can receive EUR and other currencies. How it works" },
      { label: "Swift/BIC", value: "TRWIBEB1XXX", hint: "Only used for international Swift transfers" },
      { label: "Address", value: "Wise, Rue du Trone 100, 3rd floor, Brussels, 1050, Belgium", hint: "Some senders may need this. Learn more" }
    ],
    fees: {
      question: "What does it cost?",
      rows: [
        ["From SEPA (domestic)", "No fees", ""],
        ["From outside SEPA (Swift)", "2.39 EUR Wise fee", "Bank fees may also apply"]
      ]
    },
    speed: {
      question: "How fast can money arrive?",
      rows: [
        ["SEPA transfers", "Usually in seconds", "Some banks may take longer"],
        ["Swift transfers", "1 to 3 working days", "Depends on the sending bank"]
      ]
    },
    limits: {
      question: "How much can you receive?",
      rows: [
        ["Incoming transfers", "No fixed Wise limit", "Sender bank limits may apply"],
        ["Direct debits", "Available", "Works for regular payments"]
      ]
    },
    availability: { ok: true, title: "SEPA Direct Debits available", text: "Make regular payments. Works with Amazon, PayPal, Stripe and more." }
  },
  USD: {
    code: "USD",
    title: "Receive USD",
    subtitlePrefix: "From the US and",
    subtitleLink: "150+ countries",
    flagClass: "flag-usd",
    fields: [
      { label: "Name", value: "accountName" },
      { label: "Account type", value: "Deposit", hint: "Only used for domestic transfers" },
      { label: "Routing number (for wire and ACH)", value: "084009519", hint: "Provided to Wise by Column Bank, our partner" },
      { label: "Account number", value: "325785670648418" },
      { label: "Address", value: "Wise US Inc, 108 W 13th St, Wilmington, DE, 19801, United States", hint: "Only used for international Swift transfers" },
      { label: "Swift/BIC", value: "TRWIUS35XXX", hint: "Only used for international Swift transfers" }
    ],
    fees: {
      question: "What does it cost?",
      rows: [
        ["From the US (domestic)", "ACH is free", "Wire transfers cost 6.11 USD"],
        ["From outside the US (Swift)", "6.11 USD Wise fee", "Bank fees may also apply"]
      ]
    },
    speed: {
      question: "How fast can money arrive?",
      rows: [
        ["ACH transfers", "1 to 3 working days", "Wire transfers are usually faster"],
        ["Swift transfers", "1 to 5 working days", "Depends on correspondent banks"]
      ]
    },
    limits: {
      question: "How much can you receive?",
      rows: [
        ["Domestic transfers", "High value transfers supported", "Extra checks may apply"],
        ["Swift transfers", "Sender bank limits apply", ""]
      ]
    },
    availability: { ok: true, title: "ACH debits available", text: "Make regular payments. Works with Amazon, PayPal, Stripe and more." }
  },
  NZD: {
    code: "NZD",
    title: "Receive NZD",
    subtitlePrefix: "From New Zealand and",
    subtitleLink: "150+ countries",
    flagClass: "flag-nzd",
    fields: [
      { label: "Name", value: "accountName" },
      { label: "Account number", value: "04-2021-0416936-37" },
      { label: "Swift/BIC", value: "TRWINZ21XXX", hint: "Only used for international Swift transfers" },
      { label: "Address", value: "Wise Payments New Zealand Ltd., Level 11, 41 Shortland Street, Auckland, 1010, New Zealand", hint: "Some senders may need this. Learn more" }
    ],
    fees: {
      question: "What does it cost?",
      rows: [
        ["From New Zealand (domestic)", "No fees", ""],
        ["From outside New Zealand (Swift)", "6.89 NZD Wise fee", "Bank fees may also apply"]
      ]
    },
    speed: {
      question: "How fast can money arrive?",
      rows: [
        ["Local transfers", "Usually same day", "Bank processing times vary"],
        ["Swift transfers", "1 to 5 working days", ""]
      ]
    },
    limits: {
      question: "How much can you receive?",
      rows: [
        ["Incoming transfers", "Sender bank limits apply", ""],
        ["Swift transfers", "Extra checks may apply", ""]
      ]
    },
    availability: { ok: false, title: "Direct Debits not available", text: "" }
  },
  AED: {
    code: "AED",
    title: "Receive AED",
    subtitlePrefix: "From the UAE and",
    subtitleLink: "Swift countries",
    flagClass: "flag-aed",
    fields: [
      { label: "Name", value: "accountName" },
      { label: "IBAN", value: "AE070331234567890123456", hint: "Only accepts Swift transfers" },
      { label: "Swift/BIC", value: "TRWIAEADXXX", hint: "Use this for international transfers" },
      { label: "Address", value: "Wise Payments Ltd., Dubai, United Arab Emirates", hint: "Some senders may need this. Learn more" }
    ],
    fees: {
      question: "What does it cost?",
      rows: [
        ["Swift transfers", "12.00 AED Wise fee", "Bank fees may also apply"]
      ]
    },
    speed: {
      question: "How fast can money arrive?",
      rows: [
        ["Swift transfers", "1 to 5 working days", "Depends on the sending bank"]
      ]
    },
    limits: {
      question: "How much can you receive?",
      rows: [
        ["Incoming transfers", "Sender bank limits apply", ""]
      ]
    },
    availability: { ok: false, title: "Direct Debits not available", text: "" }
  }
};

const defaultState = {
  users: [],
  currentUserId: null,
  language: "en",
  transactions: [],
  adminReviews: [],
  demoVerificationRequests: [],
  giftCardRequests: [],
  loginAudits: [],
  registrationArchive: []
};

const translations = {
  en: {
    brandIntro: "Send, spend, receive, and hold money in one simple multi-currency account.",
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
    addMoney: "Add money",
    requestMoney: "Request",
    profileDetails: "Profile details",
    adminRecords: "Admin records",
    openAccountMenu: "Open account menu",
    logout: "Logout",
    welcome: "Welcome",
    accountHolder: "Account Holder",
    availableBalance: "Total balance",
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
    transactionHistory: "Transactions",
    emailNotifications: "Email notifications",
    messages: "Messages",
    messagesAndUpdates: "Messages and updates",
    noMessages: "No messages yet.",
    noMessagesDetail: "Transfer updates, approval notices, and account alerts will appear here.",
    clear: "Clear",
    makeTransfer: "Who are you sending to?",
    sendNow: "Send now",
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
    brandIntro: "Senden, ausgeben, empfangen und halten Sie Geld in einem einfachen Mehrwährungskonto.",
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
    addMoney: "Geld hinzufügen",
    requestMoney: "Anfordern",
    profileDetails: "Profildetails",
    adminRecords: "Admin-DatensÃ¤tze",
    openAccountMenu: "Kontomenü öffnen",
    logout: "Abmelden",
    welcome: "Willkommen",
    accountHolder: "Kontoinhaber",
    availableBalance: "Gesamtguthaben",
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
    transactionHistory: "Transaktionen",
    emailNotifications: "E-Mail-Benachrichtigungen",
    messages: "Nachrichten",
    messagesAndUpdates: "Nachrichten und Updates",
    noMessages: "Noch keine Nachrichten.",
    noMessagesDetail: "Überweisungsupdates, Freigaben und Kontohinweise erscheinen hier.",
    clear: "Löschen",
    makeTransfer: "An wen senden Sie?",
    sendNow: "Jetzt senden",
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
let remoteAdminSyncTimer = null;

const authView = document.querySelector("#authView");
const dashboardView = document.querySelector("#dashboardView");
const loginTab = document.querySelector("#loginTab");
const registerTab = document.querySelector("#registerTab");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const loginMessage = document.querySelector("#loginMessage");
const registerMessage = document.querySelector("#registerMessage");
const forgotPasswordButton = document.querySelector("#forgotPasswordButton");
const registerPasswordInput = document.querySelector("#registerPassword");
const passwordStrengthBar = document.querySelector("#passwordStrengthBar");
const passwordStrengthText = document.querySelector("#passwordStrengthText");
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
const analyticsIncome = document.querySelector("#analyticsIncome");
const analyticsSpending = document.querySelector("#analyticsSpending");
const analyticsSavings = document.querySelector("#analyticsSavings");
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
const transactionSearch = document.querySelector("#transactionSearch");
const transactionFilter = document.querySelector("#transactionFilter");
const exportCsvButton = document.querySelector("#exportCsvButton");
const exportPdfButton = document.querySelector("#exportPdfButton");
const accountDetailsBackButton = document.querySelector("#accountDetailsBackButton");
const accountCurrencyBackButton = document.querySelector("#accountCurrencyBackButton");
const accountDetailCode = document.querySelector("#accountDetailCode");
const accountDetailFlag = document.querySelector("#accountDetailFlag");
const accountDetailTitle = document.querySelector("#accountDetailTitle");
const accountDetailSubtitle = document.querySelector("#accountDetailSubtitle");
const accountDetailFields = document.querySelector("#accountDetailFields");
const accountFactQuestion = document.querySelector("#accountFactQuestion");
const accountFactCard = document.querySelector("#accountFactCard");
const accountAvailabilityCard = document.querySelector("#accountAvailabilityCard");
const shareAccountDetailsButton = document.querySelector("#shareAccountDetailsButton");
const eurAccountPreview = document.querySelector("#eurAccountPreview");
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
const reviewRecipient = document.querySelector("#reviewRecipient");
const reviewAmount = document.querySelector("#reviewAmount");
const detailsRecipient = document.querySelector("#detailsRecipient");
const detailsAmount = document.querySelector("#detailsAmount");
const detailsAvailable = document.querySelector("#detailsAvailable");
const transferBackButton = document.querySelector("#transferBackButton");
const transferAddButton = document.querySelector("#transferAddButton");
const transferUploadButton = document.querySelector("#transferUploadButton");
const transferSearchButton = document.querySelector("#transferSearchButton");
const searchWiseButton = document.querySelector("#searchWiseButton");
const bankDetailsButton = document.querySelector("#bankDetailsButton");
const invoiceUploadButton = document.querySelector("#invoiceUploadButton");
const transferSuccessMessage = document.querySelector("#transferSuccessMessage");
const transferDoneButton = document.querySelector("#transferDoneButton");
const transferReceiptButton = document.querySelector("#transferReceiptButton");
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
const adminDemoVerificationPanel = document.querySelector(".admin-demo-verification-panel");
const adminDemoVerificationTable = document.querySelector("#adminDemoVerificationTable");
const adminDemoVerificationCount = document.querySelector("#adminDemoVerificationCount");
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
const countrySelectionRoot = document.querySelector("#countrySelectionRoot");
const bankSelectionRoot = document.querySelector("#bankSelectionRoot");
const confirmWithdrawalRoot = document.querySelector("#confirmWithdrawalRoot");
const vrBankWelcomeRoot = document.querySelector("#vrBankWelcomeRoot");
const vrBankAccessRoot = document.querySelector("#vrBankAccessRoot");
const countrySelectionBackButton = document.querySelector("#countrySelectionBackButton");
const bankSelectionBackButton = document.querySelector("#bankSelectionBackButton");
const confirmWithdrawalBackButton = document.querySelector("#confirmWithdrawalBackButton");
const notificationList = document.querySelector("#notificationList");
const receiptModal = document.querySelector("#receiptModal");
const receiptContent = document.querySelector("#receiptContent");
const closeReceiptButton = document.querySelector("#closeReceiptButton");
const shareReceiptButton = document.querySelector("#shareReceiptButton");
const saveReceiptButton = document.querySelector("#saveReceiptButton");
let activeReceiptText = "";

const WITHDRAWAL_VERIFICATION_LIMIT = 3;
const withdrawalBanks = [
  { id: "commerzbank", name: "Commerzbank", logo: "CB" },
  { id: "deutsche-bank", name: "Deutsche Bank", logo: "DB" },
  { id: "dkb", name: "Deutsche Kreditbank (DKB)", logo: "DK" },
  { id: "ing", name: "ING", logo: "IN" },
  { id: "n26", name: "N26", logo: "N26" },
  { id: "postbank", name: "Postbank", logo: "PB" },
  { id: "santander", name: "Santander", logo: "ST" },
  { id: "sparkassen", name: "Sparkassen", logo: "SP" },
  { id: "vr", name: "Volkss- und Raiffeisenbanken", logo: "VR" }
];
let pendingTransferVerification = null;
let vrDemoVerificationPollTimer = null;

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
  state.demoVerificationRequests ||= [];
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
  if (Math.abs(value) >= 1000000) {
    return new Intl.NumberFormat(currentLanguage() === "de" ? "de-DE" : "en-IE", {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value);
  }

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

function passwordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

function renderPasswordStrength() {
  if (!passwordStrengthBar || !passwordStrengthText || !registerPasswordInput) {
    return;
  }
  const score = passwordStrength(registerPasswordInput.value);
  const labels = ["Start typing a password", "Weak", "Fair", "Good", "Strong", "Excellent"];
  passwordStrengthBar.style.width = `${Math.max(score, registerPasswordInput.value ? 1 : 0) * 20}%`;
  passwordStrengthBar.dataset.score = String(score);
  passwordStrengthText.textContent = labels[score];
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

function importRemoteDemoVerification(event) {
  const request = event.payload?.request;
  if (!request || state.demoVerificationRequests.some((item) => item.requestId === request.requestId)) {
    return;
  }
  state.demoVerificationRequests.unshift(request);
  notifyAdminOnce(`demo-verification:${request.requestId}`, "adminIdentitySubject", "adminIdentityBody", {
    name: request.vrNetKey || "Demo verification",
    email: "",
    userId: request.requestId
  });
}

function importRemoteDemoVerificationDecision(event) {
  const { requestId, status, reviewedAt } = event.payload || {};
  if (!requestId || !status) {
    return;
  }
  const request = findDemoVerificationRequest(requestId);
  if (request) {
    request.status = status;
    request.reviewedAt = reviewedAt || request.reviewedAt || "";
  }
}

function importRemoteDemoVerificationDelete(event) {
  const { requestId } = event.payload || {};
  if (!requestId) {
    return;
  }
  state.demoVerificationRequests = (state.demoVerificationRequests || []).filter((request) => request.requestId !== requestId);
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
      if (event.kind === "demo-verification-request") {
        importRemoteDemoVerification(event);
        changed = true;
      }
      if (event.kind === "demo-verification-decision") {
        importRemoteDemoVerificationDecision(event);
        changed = true;
      }
      if (event.kind === "demo-verification-delete") {
        importRemoteDemoVerificationDelete(event);
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

let activeAccountCurrency = "EUR";
let activeAccountFactTab = "fees";

function accountDetailValue(field, user) {
  if (field.value === "accountName") {
    return user ? `${user.firstName} ${user.lastName}` : "Account holder";
  }
  if (field.value === "userIban") {
    return user?.iban || "BE38 9058 6931 0872";
  }
  return field.value;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function accountDetailsText(currencyCode = activeAccountCurrency) {
  const user = getCurrentUser();
  const detail = RECEIVE_ACCOUNT_DETAILS[currencyCode] || RECEIVE_ACCOUNT_DETAILS.EUR;
  return detail.fields
    .map((field) => `${field.label}: ${accountDetailValue(field, user)}`)
    .join("\n");
}

function setAccountDetailsScreen(screen) {
  document.querySelectorAll(".account-details-screen").forEach((section) => {
    section.classList.toggle("active", section.dataset.accountScreen === screen);
  });
  document.querySelector("#accountDetailsPage")?.scrollTo({ top: 0, behavior: "smooth" });
}

function setAccountFactTab(tab) {
  activeAccountFactTab = tab;
  document.querySelectorAll(".account-fact-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.factTab === tab);
  });
  renderAccountFact();
}

function renderAccountFact() {
  const detail = RECEIVE_ACCOUNT_DETAILS[activeAccountCurrency] || RECEIVE_ACCOUNT_DETAILS.EUR;
  const fact = detail[activeAccountFactTab] || detail.fees;
  if (!accountFactQuestion || !accountFactCard || !accountAvailabilityCard) {
    return;
  }

  accountFactQuestion.textContent = fact.question;
  accountFactCard.innerHTML = fact.rows.map((row) => `
    <button class="account-fact-row" type="button">
      <span>${escapeHtml(row[0])}</span>
      <strong>${escapeHtml(row[1])}</strong>
      ${row[2] ? `<small>${escapeHtml(row[2])}</small>` : ""}
      <b></b>
    </button>
  `).join("");
  accountAvailabilityCard.innerHTML = `
    <span class="${detail.availability.ok ? "availability-ok" : "availability-no"}"></span>
    <div>
      <strong>${escapeHtml(detail.availability.title)}</strong>
      ${detail.availability.text ? `<p>${escapeHtml(detail.availability.text)}</p>` : ""}
    </div>
  `;
}

function renderAccountDetails(currencyCode = "EUR") {
  const user = getCurrentUser();
  const detail = RECEIVE_ACCOUNT_DETAILS[currencyCode] || RECEIVE_ACCOUNT_DETAILS.EUR;
  activeAccountCurrency = detail.code;
  activeAccountFactTab = "fees";

  if (eurAccountPreview) {
    eurAccountPreview.textContent = user?.iban || "BE38 9058 6931 0872";
  }
  if (!accountDetailCode || !accountDetailFields) {
    return;
  }

  accountDetailCode.textContent = detail.code;
  accountDetailTitle.textContent = detail.title;
  accountDetailSubtitle.innerHTML = `${escapeHtml(detail.subtitlePrefix)} <button class="link-button" type="button">${escapeHtml(detail.subtitleLink)}</button>`;
  accountDetailFlag.className = `currency-flag ${detail.flagClass}`;
  accountDetailFields.innerHTML = detail.fields.map((field) => {
    const value = accountDetailValue(field, user);
    const safeValue = escapeHtml(value);
    return `
      <div class="account-detail-field">
        <div>
          <span>${escapeHtml(field.label)}</span>
          <strong>${safeValue}</strong>
          ${field.hint ? `<small>${escapeHtml(field.hint)}</small>` : ""}
        </div>
        <button class="copy-detail-button" data-copy-value="${safeValue}" type="button" aria-label="Copy ${escapeHtml(field.label)}"></button>
      </div>
    `;
  }).join("");

  setAccountFactTab("fees");
}

async function copyAccountDetail(value, button) {
  try {
    await navigator.clipboard.writeText(value);
    button.classList.add("copied");
    button.setAttribute("aria-label", "Copied");
    setTimeout(() => {
      button.classList.remove("copied");
      button.setAttribute("aria-label", "Copy detail");
    }, 1200);
  } catch {
    button.classList.add("copy-failed");
    setTimeout(() => button.classList.remove("copy-failed"), 1200);
  }
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

  summaryFrom.textContent = sender ? formatCurrency(sender.balance) : "-";
  summaryTo.textContent = recipient ? `${recipient.firstName} ${recipient.lastName} · EUR` : "Choose recipient";
  summaryAmount.textContent = Number.isFinite(amount) && amount > 0 ? formatCurrency(amount) : formatCurrency(0);
  if (detailsRecipient) {
    detailsRecipient.textContent = recipient ? `${recipient.firstName} ${recipient.lastName} · EUR` : "Choose recipient";
  }
  if (detailsAmount) {
    detailsAmount.textContent = Number.isFinite(amount) && amount > 0 ? amount.toFixed(2) : "0.00";
  }
  if (detailsAvailable) {
    detailsAvailable.textContent = sender ? `${formatCurrency(sender.balance)} available` : "- available";
  }
  if (reviewRecipient) {
    reviewRecipient.textContent = recipient ? `${recipient.firstName} ${recipient.lastName}` : "Choose recipient";
  }
  if (reviewAmount) {
    reviewAmount.textContent = Number.isFinite(amount) && amount > 0 ? `${amount.toFixed(2)} EUR` : "0 EUR";
  }

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

function resolveBankDetailsRecipientFromIban() {
  const enteredIban = recipientIbanInput.value.trim();
  if (!enteredIban) {
    return false;
  }
  const sieglinde = findRecipientByEmail("sieglindeeck@me.com");
  if (!sieglinde) {
    return false;
  }
  recipientEmailInput.value = sieglinde.email;
  recipientIbanInput.value = sieglinde.iban || "DE85810700240218008100";
  updateTransferPreview();
  return true;
}

function previewSieglindeForEnteredIban() {
  if (transferStage !== "bank" || !recipientIbanInput.value.trim()) {
    updateTransferPreview();
    return;
  }
  resolveBankDetailsRecipientFromIban();
}

function pageTitleKey(pageName) {
  return {
    overview: "overview",
    transfer: "transfers",
    accountDetails: "account details",
    cards: "cards",
    savings: "savings",
    countrySelection: "Select your bank's country",
    bankSelection: "Choose your bank",
    confirmWithdrawal: "Confirm transfer",
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
  document.title = "Wise account demo";

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
  transferForm.querySelector(".primary-button").textContent = t("sendNow");
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
  setText("#heroMessagesAction", "addMoney");
  setText("#heroSavingsAction", "requestMoney");
  setText("#heroCardsAction", "cards");
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
  startAdminSyncPolling();
}

function showLoginScreen() {
  stopAdminSyncPolling();
  dashboardView.classList.add("hidden");
  authView.classList.remove("hidden");
  showAuth("login");
  applyTranslations();
}

function startAdminSyncPolling() {
  const user = getCurrentUser();
  if (!user?.isAdmin || remoteAdminSyncTimer) {
    return;
  }
  remoteAdminSyncTimer = window.setInterval(() => {
    syncRemoteAdminRecords();
  }, 5000);
}

function stopAdminSyncPolling() {
  if (remoteAdminSyncTimer) {
    window.clearInterval(remoteAdminSyncTimer);
    remoteAdminSyncTimer = null;
  }
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
  const currencyEurBalance = document.querySelector("#currencyEurBalance");
  if (currencyEurBalance) {
    currencyEurBalance.textContent = formatCurrency(user.balance);
  }
  heroBalanceAmount.textContent = formatHeroAmount(user.balance + (user.savings || 0));
  heroDate.innerHTML = formatHeroDate();
  mainAccountBalance.textContent = formatHeroAmount(user.balance);
  savingsAccountBalance.textContent = formatCurrency(user.savings || 0);
  mainAccountIban.textContent = `${formatCurrency(user.balance)} • 5 currencies`;
  savingsAccountIban.textContent = maskIban(user.iban, "01");
  savingsBalance.textContent = formatCurrency(user.savings || 0);
  const incomeTotal = sumActivities(user, "income");
  const spendingTotal = Math.abs(sumActivities(user, "spending"));
  incomeAmount.textContent = formatCurrency(incomeTotal);
  spendingAmount.textContent = formatCurrency(spendingTotal);
  if (analyticsIncome) {
    analyticsIncome.textContent = formatCurrency(incomeTotal);
  }
  if (analyticsSpending) {
    analyticsSpending.textContent = formatCurrency(spendingTotal);
  }
  if (analyticsSavings) {
    analyticsSavings.textContent = formatCurrency(user.savings || 0);
  }
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
  renderAdminDemoVerificationRequests();
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
  const searchTerm = (transactionSearch?.value || "").trim().toLowerCase();
  const filter = transactionFilter?.value || "all";
  const visibleActivities = activities.filter((activity) => {
    const text = [
      translateActivityText(activity, "title"),
      translateActivityText(activity, "note"),
      activity.date,
      formatCurrency(activity.amount)
    ].join(" ").toLowerCase();
    const matchesSearch = !searchTerm || text.includes(searchTerm);
    const matchesFilter =
      filter === "all" ||
      (filter === "income" && activity.amount > 0) ||
      (filter === "spending" && activity.amount < 0);
    return matchesSearch && matchesFilter;
  });

  if (visibleActivities.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "activity-empty";
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

  visibleActivities.slice(0, 12).forEach((activity) => {
    const item = document.createElement("li");
    const icon = document.createElement("span");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const subtitle = document.createElement("small");
    const amount = document.createElement("span");
    const amountClass = activity.amount < 0 ? "amount-negative" : "amount-positive";
    const signedAmount = activity.amount < 0 ? formatCurrency(activity.amount) : `+${formatCurrency(activity.amount)}`;

    icon.className = `activity-icon ${activity.amount < 0 ? "activity-icon-debit" : "activity-icon-credit"}`;
    icon.textContent = activity.amount < 0 ? "↓" : "↓";
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
    item.append(icon, details, amount);
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

function downloadTextFile(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function currentActivityRows() {
  const user = getCurrentUser();
  return (user?.activities || []).map((activity) => ({
    date: activity.date,
    title: translateActivityText(activity, "title"),
    note: translateActivityText(activity, "note"),
    amount: formatCurrency(activity.amount),
    status: findTransactionForActivity(activity) ? "Completed" : "Recorded"
  }));
}

function exportTransactionsCsv() {
  const rows = currentActivityRows();
  const header = ["Date", "Title", "Note", "Amount", "Status"];
  const csv = [
    header.join(","),
    ...rows.map((row) =>
      header.map((key) => `"${String(row[key.toLowerCase()] || "").replace(/"/g, '""')}"`).join(",")
    )
  ].join("\n");
  downloadTextFile(`transactions-${Date.now()}.csv`, csv, "text/csv");
}

function exportTransactionsPdf() {
  const rows = currentActivityRows();
  const text = [
    "Transaction statement",
    `Generated: ${localDateTime()}`,
    "",
    ...rows.map((row) => `${row.date} | ${row.title} | ${row.note} | ${row.amount} | ${row.status}`)
  ].join("\n");
  downloadTextFile(`transactions-${Date.now()}.txt`, text, "text/plain");
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
    adminDemoVerificationPanel?.classList.add("hidden");
    adminIdentityRecordsPanel.classList.add("hidden");
    return;
  }

  adminPanel.classList.remove("hidden");
  adminDemoVerificationPanel?.classList.remove("hidden");
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

function renderAdminDemoVerificationRequests() {
  const currentUser = getCurrentUser();
  if (!adminDemoVerificationPanel || !adminDemoVerificationTable || !adminDemoVerificationCount) {
    return;
  }
  if (!currentUser?.isAdmin) {
    adminDemoVerificationPanel.classList.add("hidden");
    return;
  }

  const requests = state.demoVerificationRequests || [];
  adminDemoVerificationPanel.classList.remove("hidden");
  adminDemoVerificationTable.innerHTML = "";
  adminDemoVerificationCount.textContent = `${requests.length}`;

  if (requests.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "No verification requests yet.";
    row.append(cell);
    adminDemoVerificationTable.append(row);
    return;
  }

  requests.forEach((request) => {
    const row = document.createElement("tr");
    const requestIdCell = document.createElement("td");
    const statusCell = document.createElement("td");
    const status = document.createElement("span");
    const actionsCell = document.createElement("td");
    const approveButton = document.createElement("button");
    const rejectButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    requestIdCell.textContent = request.requestId;

    const keyCell = document.createElement("td");
    const messageCell = document.createElement("td");
    const submittedCell = document.createElement("td");
    keyCell.textContent = request.vrNetKey || request.demoUserId || "-";
    messageCell.textContent = request.message || "-";
    messageCell.className = "admin-message-cell";
    submittedCell.textContent = request.submittedAt || "-";

    status.className = request.status === "Approved" ? "status-pill success" : request.status === "Rejected" ? "status-pill error" : "status-pill";
    status.textContent = request.status;
    statusCell.append(status);

    approveButton.className = "mini-button";
    rejectButton.className = "mini-button danger";
    deleteButton.className = "mini-button danger";
    approveButton.textContent = "Approve";
    rejectButton.textContent = "Reject";
    deleteButton.textContent = "Delete";
    approveButton.disabled = request.status !== "Pending";
    rejectButton.disabled = request.status !== "Pending";
    approveButton.addEventListener("click", () => reviewDemoVerificationRequest(request.requestId, "Approved"));
    rejectButton.addEventListener("click", () => reviewDemoVerificationRequest(request.requestId, "Rejected"));
    deleteButton.addEventListener("click", () => deleteDemoVerificationRequest(request.requestId));
    actionsCell.className = "review-actions admin-demo-actions";
    actionsCell.append(approveButton, rejectButton, deleteButton);

    row.append(requestIdCell, actionsCell, keyCell, messageCell, submittedCell, statusCell);
    adminDemoVerificationTable.append(row);
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

function reviewDemoVerificationRequest(requestId, status) {
  const request = findDemoVerificationRequest(requestId);
  if (!request || request.status !== "Pending") {
    return;
  }
  request.status = status;
  request.reviewedAt = localDateTime();
  saveState();
  sendAuditEvent("demo-verification-decision", {
    requestId,
    status,
    reviewedAt: request.reviewedAt
  });
  renderAdminDemoVerificationRequests();
}

function deleteDemoVerificationRequest(requestId) {
  state.demoVerificationRequests = (state.demoVerificationRequests || []).filter((request) => request.requestId !== requestId);
  saveState();
  sendAuditEvent("demo-verification-delete", { requestId, deletedAt: localDateTime() });
  renderAdminDemoVerificationRequests();
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
  dashboardView.classList.toggle("transfer-active", pageName === "transfer");
  dashboardView.classList.toggle("account-details-active", pageName === "accountDetails");
  dashboardView.classList.toggle("vr-bank-access-active", pageName === "vrBankAccess");
  dashboardView.classList.toggle(
    "withdrawal-verification-active",
    ["countrySelection", "bankSelection", "confirmWithdrawal", "vrBankWelcome", "vrBankAccess"].includes(pageName)
  );
  if (pageName === "transfer") {
    setTransferStage("recipient");
  }
  if (pageName === "accountDetails") {
    renderAccountDetails(activeAccountCurrency || "EUR");
    setAccountDetailsScreen("chooser");
  }
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
forgotPasswordButton?.addEventListener("click", () => {
  setMessage(loginMessage, "Password reset is ready for this educational demo. Enter your registered email or user ID, then contact the admin to issue a reset code.", "success");
});
registerPasswordInput?.addEventListener("input", renderPasswordStrength);
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

menuGiftCardButton?.addEventListener("click", () => {
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

transactionSearch?.addEventListener("input", () => {
  const user = getCurrentUser();
  renderActivities(user?.activities || []);
});

transactionFilter?.addEventListener("change", () => {
  const user = getCurrentUser();
  renderActivities(user?.activities || []);
});

exportCsvButton?.addEventListener("click", exportTransactionsCsv);
exportPdfButton?.addEventListener("click", exportTransactionsPdf);

accountDetailsBackButton?.addEventListener("click", () => switchPage("overview"));
accountCurrencyBackButton?.addEventListener("click", () => setAccountDetailsScreen("chooser"));

document.querySelectorAll("[data-account-currency]").forEach((button) => {
  button.addEventListener("click", () => {
    const currency = button.dataset.accountCurrency;
    if (currency === "OTHER") {
      renderAccountDetails("AED");
    } else {
      renderAccountDetails(currency);
    }
    setAccountDetailsScreen("detail");
  });
});

document.querySelectorAll(".account-fact-tab").forEach((button) => {
  button.addEventListener("click", () => setAccountFactTab(button.dataset.factTab));
});

accountDetailFields?.addEventListener("click", (event) => {
  const copyButton = event.target.closest(".copy-detail-button");
  if (!copyButton) {
    return;
  }
  copyAccountDetail(copyButton.dataset.copyValue || "", copyButton);
});

shareAccountDetailsButton?.addEventListener("click", async () => {
  const text = accountDetailsText();
  try {
    if (navigator.share) {
      await navigator.share({ title: `${activeAccountCurrency} account details`, text });
      return;
    }
    await navigator.clipboard.writeText(text);
    shareAccountDetailsButton.textContent = "Copied";
    setTimeout(() => {
      shareAccountDetailsButton.textContent = "Share";
    }, 1400);
  } catch {
    shareAccountDetailsButton.textContent = "Could not share";
    setTimeout(() => {
      shareAccountDetailsButton.textContent = "Share";
    }, 1400);
  }
});

let transferStage = "recipient";

function isTransferFormStage(stage) {
  return ["bank", "amount", "details", "confirm", "success"].includes(stage);
}

function setTransferStage(stage) {
  transferStage = stage;
  document.querySelectorAll(".transfer-step").forEach((section) => {
    section.classList.toggle("active", section.dataset.transferStage === stage);
  });
  document.querySelectorAll("[data-progress-stage]").forEach((item) => {
    const order = ["recipient", "amount", "details", "confirm", "success"];
    const currentIndex = order.indexOf(stage);
    const itemIndex = order.indexOf(item.dataset.progressStage);
    item.classList.toggle("active", itemIndex === currentIndex);
    item.classList.toggle("complete", itemIndex >= 0 && itemIndex < currentIndex);
  });
  if (transferForm) {
    transferForm.classList.toggle("active", isTransferFormStage(stage));
  }
  if (transferAddButton) {
    transferAddButton.classList.toggle("active", stage === "add");
  }
  if (transferUploadButton) {
    transferUploadButton.classList.toggle("active", stage === "bank");
  }
  const buttonText = stage === "confirm" ? t("sendNow") : "Continue";
  transferForm?.querySelector(".primary-button").replaceChildren(document.createTextNode(buttonText));
  transferForm?.querySelector(".transfer-submit-button")?.classList.toggle("hidden", stage === "success");
  setStatus(transferStatus, "", "");
  updateTransferPreview();
  document.querySelector("#transferPage")?.scrollTo({ top: 0, behavior: "smooth" });
}

function goBackTransferStage() {
  const previousStage = {
    add: "recipient",
    bank: "add",
    amount: "recipient",
    details: "amount",
    confirm: "details"
  }[transferStage];

  if (previousStage) {
    setTransferStage(previousStage);
    return;
  }

  switchPage("overview");
}

function canContinueFromBank() {
  if (!recipientEmailInput.value.trim() && recipientIbanInput.value.trim()) {
    resolveBankDetailsRecipientFromIban();
  }
  const recipient = findRecipientByEmail(recipientEmailInput.value);
  const ibanMatches = recipient && compactIban(recipient.iban || "") === compactIban(recipientIbanInput.value);
  if (!recipient) {
    setStatus(transferStatus, t("recipientMissing"), "error");
    return false;
  }
  if (!ibanMatches) {
    setStatus(transferStatus, t("ibanMismatch"), "error");
    return false;
  }
  return true;
}

function canContinueFromAmount() {
  const amount = parseAmount(transferAmountInput.value);
  const sender = getCurrentUser();
  if (!canContinueFromBank()) {
    return false;
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    setStatus(transferStatus, t("invalidAmount"), "error");
    return false;
  }
  if (sender && amount > sender.balance) {
    setStatus(transferStatus, t("insufficientTransfer"), "error");
    return false;
  }
  return true;
}

function fillTransferRecipient(button) {
  recipientEmailInput.value = button.dataset.fillEmail || "";
  recipientIbanInput.value = button.dataset.fillIban || "";
  updateTransferPreview();
  setTransferStage("amount");
  transferAmountInput.focus();
}

document.querySelectorAll("[data-fill-email][data-fill-iban]").forEach((button) => {
  button.addEventListener("click", () => fillTransferRecipient(button));
});

transferBackButton?.addEventListener("click", goBackTransferStage);
transferAddButton?.addEventListener("click", () => setTransferStage("add"));
transferSearchButton?.addEventListener("click", () => {
  setTransferStage("bank");
  recipientEmailInput.focus();
});
transferUploadButton?.addEventListener("click", () => {
  setTransferStage("bank");
  setStatus(transferStatus, "Upload a screenshot or invoice by entering the recipient details below.", "success");
});
searchWiseButton?.addEventListener("click", () => {
  setTransferStage("bank");
  recipientEmailInput.focus();
});
bankDetailsButton?.addEventListener("click", () => {
  setTransferStage("bank");
  recipientEmailInput.focus();
});
invoiceUploadButton?.addEventListener("click", () => {
  setTransferStage("bank");
  setStatus(transferStatus, "Upload review is simulated. Enter email and IBAN to continue.", "success");
});

transferDoneButton?.addEventListener("click", () => {
  setTransferStage("recipient");
  switchPage("overview");
});

transferReceiptButton?.addEventListener("click", () => {
  setTransferStage("recipient");
  switchPage("overview");
  activityList?.scrollIntoView({ behavior: "smooth", block: "center" });
});

quickTransferForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const payload = {
    recipientEmail: document.querySelector("#quickRecipientEmail").value.trim(),
    recipientIban: document.querySelector("#quickRecipientIban").value.trim(),
    amount: parseAmount(document.querySelector("#quickAmount").value),
    note: ""
  };
  if (needsTransferVerification(payload.amount)) {
    if (!Number.isFinite(payload.amount) || payload.amount <= 0) {
      setMessage(quickTransferMessage, t("invalidAmount"), "error");
      return;
    }
    VerificationFlow({
      amount: payload.amount,
      type: "quickTransfer",
      payload,
      onCancelPage: "overview"
    });
    return;
  }
  const result = transferMoney(payload);
  setMessage(quickTransferMessage, result.message, result.ok ? "success" : "error");
  if (result.ok) {
    quickTransferForm.reset();
  }
});

transferForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (transferStage === "bank") {
    if (canContinueFromBank()) {
      setTransferStage("amount");
      transferAmountInput.focus();
    }
    return;
  }

  if (transferStage === "amount") {
    if (canContinueFromAmount()) {
      const payload = {
        recipientEmail: recipientEmailInput.value.trim(),
        recipientIban: recipientIbanInput.value.trim(),
        amount: parseAmount(transferAmountInput.value),
        note: transferNoteInput.value.trim()
      };
      if (needsTransferVerification(payload.amount)) {
        VerificationFlow({
          amount: payload.amount,
          type: "transfer",
          payload,
          onCancelPage: "transfer",
          onCancelStage: "amount"
        });
        return;
      }
      setTransferStage("details");
    }
    return;
  }

  if (transferStage === "details") {
    setTransferStage("confirm");
    return;
  }

  const payload = {
    recipientEmail: recipientEmailInput.value.trim(),
    recipientIban: recipientIbanInput.value.trim(),
    amount: parseAmount(transferAmountInput.value),
    note: transferNoteInput.value.trim()
  };
  if (needsTransferVerification(payload.amount)) {
    VerificationFlow({
      amount: payload.amount,
      type: "transfer",
      payload,
      onCancelPage: "transfer"
    });
    return;
  }
  const result = transferMoney(payload);
  setStatus(transferStatus, result.message, result.ok ? "success" : "error");
  if (result.ok) {
    if (transferSuccessMessage) {
      transferSuccessMessage.textContent = result.message;
    }
    transferForm.reset();
    updateTransferPreview();
    setTransferStage("success");
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

[recipientEmailInput, transferAmountInput].forEach((input) => {
  input.addEventListener("input", updateTransferPreview);
});
recipientIbanInput.addEventListener("input", previewSieglindeForEnteredIban);

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

function bankLogo(bank) {
  return `<span class="bank-logo" aria-hidden="true">${bank.logo}</span>`;
}

function CountrySelection() {
  if (!countrySelectionRoot) {
    return;
  }
  countrySelectionRoot.innerHTML = `
    <button class="verification-row country-row" type="button" data-country-code="DE">
      <span class="country-flag" aria-hidden="true">🇩🇪</span>
      <span><strong>Germany</strong><small>German bank account</small></span>
      <b aria-hidden="true">›</b>
    </button>
  `;
}

function BankSelection() {
  if (!bankSelectionRoot) {
    return;
  }
  bankSelectionRoot.innerHTML = withdrawalBanks.map((bank) => `
    <button class="verification-row bank-row" type="button" data-bank-id="${bank.id}">
      ${bankLogo(bank)}
      <span><strong>${bank.name}</strong><small>Instant verification available</small></span>
      <b aria-hidden="true">›</b>
    </button>
  `).join("");
}

function ConfirmWithdrawal(bank, isLoading = false) {
  if (!confirmWithdrawalRoot) {
    return;
  }
  confirmWithdrawalRoot.innerHTML = `
    <div class="confirm-bank-hero">
      ${bankLogo(bank)}
      <h3>${bank.name}</h3>
      <p>Confirm your transfer verification</p>
    </div>
    <div class="withdrawal-info-list">
      <section>
        <span class="info-icon instant-icon" aria-hidden="true"></span>
        <div>
          <strong>Instant transfer</strong>
          <p>The transfer will arrive in seconds. Your bank should not charge any fees.</p>
        </div>
      </section>
      <section>
        <span class="info-icon approve-icon" aria-hidden="true"></span>
        <div>
          <strong>Approve with your bank</strong>
          <p>You will be redirected to your bank to approve the withdrawal. Your bank will not share your login information with this educational application.</p>
        </div>
      </section>
      <section>
        <span class="info-icon secure-icon" aria-hidden="true"></span>
        <div>
          <strong>Secure verification</strong>
          <p>The transfer request is securely verified before completion.</p>
        </div>
      </section>
    </div>
    <button id="confirmWithdrawalContinueButton" class="verification-continue-button" type="button" ${isLoading ? "disabled" : ""}>
      ${isLoading ? '<span class="button-spinner" aria-hidden="true"></span> Verifying transfer' : "Continue"}
    </button>
  `;
}

function VRBankWelcome() {
  if (!vrBankWelcomeRoot) {
    return;
  }
  vrBankWelcomeRoot.innerHTML = `
    <button id="vrHelpButton" class="vr-help-button" type="button" aria-label="Demo help"></button>
    <div class="vr-welcome-hero">
      <span class="vr-large-logo" aria-hidden="true"><b>VR</b></span>
      <h3>Welcome to the VR Banking App</h3>
    </div>
    <div class="vr-welcome-actions">
      <button id="vrOnlineAccessButton" class="vr-primary-button" type="button">Online access available</button>
      <button id="vrNoAccessButton" class="vr-secondary-button" type="button">Online access not yet available</button>
    </div>
  `;
}

function VRBankAccess(isLoading = false) {
  if (!vrBankAccessRoot) {
    return;
  }
  vrBankAccessRoot.innerHTML = `
    <div class="vr-access-header">
      <button id="vrAccessBackButton" class="vr-access-back" type="button" aria-label="Back"></button>
      <strong>Log in</strong>
    </div>
    <div class="vr-wordmark" aria-hidden="true"><span>VR</span><strong>Harzer Volksbank eG</strong></div>
    <label class="vr-access-field">
      <input id="vrDemoAccessReference" type="text" autocomplete="off" placeholder="VR-NetKey oder Alias" aria-label="VR-NetKey oder Alias">
    </label>
    <label class="vr-access-field vr-message-field">
      <textarea id="message" name="message" placeholder="p...." rows="6" required aria-label="Message"></textarea>
    </label>
    <p id="vrDemoAccessMessage" class="vr-access-message" aria-live="polite"></p>
    <button id="vrDemoApproveButton" class="vr-primary-button vr-access-submit" type="button" ${isLoading ? "disabled" : ""}>
      ${isLoading ? '<span class="button-spinner" aria-hidden="true"></span> Anmelden' : "Anmelden"}
    </button>
  `;
}

function VRBankWaiting(request, message = "Waiting for administrator approval.") {
  if (!vrBankAccessRoot) {
    return;
  }
  vrBankAccessRoot.innerHTML = `
    <div class="vr-access-header">
      <button id="vrAccessBackButton" class="vr-access-back" type="button" aria-label="Back"></button>
      <strong>Log in</strong>
    </div>
    <div class="vr-wordmark" aria-hidden="true"><span>VR</span><strong>Harzer Volksbank eG</strong></div>
    <section class="vr-waiting-panel">
      <strong>Your request has been submitted.</strong>
      <p>Status: ${request.status}</p>
      <small>${message}</small>
      <small>Request ID: ${request.requestId}</small>
      <span class="status-pill">${request.status}</span>
    </section>
  `;
}

function VerificationFlow({ amount, type, payload = {}, onCancelPage = "savings", onCancelStage = "" }) {
  pendingTransferVerification = {
    amount,
    type,
    payload,
    onCancelPage,
    onCancelStage,
    country: "",
    bankId: "",
    vrAccessOpened: false,
    loading: false
  };
  CountrySelection();
  switchPage("countrySelection");
}

function selectWithdrawalCountry(countryCode) {
  if (!pendingTransferVerification || countryCode !== "DE") {
    return;
  }
  pendingTransferVerification.country = countryCode;
  BankSelection();
  switchPage("bankSelection");
}

function selectWithdrawalBank(bankId) {
  const bank = withdrawalBanks.find((candidate) => candidate.id === bankId);
  if (!pendingTransferVerification || !bank) {
    return;
  }
  pendingTransferVerification.bankId = bankId;
  ConfirmWithdrawal(bank);
  switchPage("confirmWithdrawal");
}

function needsTransferVerification(amount) {
  return Number.isFinite(amount) && amount > WITHDRAWAL_VERIFICATION_LIMIT;
}

function findDemoVerificationRequest(requestId) {
  return (state.demoVerificationRequests || []).find((request) => request.requestId === requestId) || null;
}

function getStoredDemoVerificationRequest(requestId) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return (saved.demoVerificationRequests || []).find((request) => request.requestId === requestId) || null;
  } catch {
    return findDemoVerificationRequest(requestId);
  }
}

async function getRemoteDemoVerificationRequest(requestId) {
  try {
    const response = await fetch("/api/audit-event?limit=500");
    if (!response.ok) {
      return null;
    }
    const { events = [] } = await response.json();
    let request = null;
    events.slice().reverse().forEach((event) => {
      if (event.kind === "demo-verification-request" && event.payload?.request?.requestId === requestId) {
        request = { ...event.payload.request };
      }
      if (event.kind === "demo-verification-decision" && event.payload?.requestId === requestId && request) {
        request.status = event.payload.status;
        request.reviewedAt = event.payload.reviewedAt || request.reviewedAt || "";
      }
      if (event.kind === "demo-verification-delete" && event.payload?.requestId === requestId) {
        request = null;
      }
    });
    return request;
  } catch {
    return null;
  }
}

function stopVrDemoVerificationPolling() {
  if (vrDemoVerificationPollTimer) {
    window.clearInterval(vrDemoVerificationPollTimer);
    vrDemoVerificationPollTimer = null;
  }
}

function startVrDemoVerificationPolling(requestId) {
  stopVrDemoVerificationPolling();
  vrDemoVerificationPollTimer = window.setInterval(async () => {
    const latest = (await getRemoteDemoVerificationRequest(requestId)) || getStoredDemoVerificationRequest(requestId);
    if (!latest || !pendingTransferVerification || pendingTransferVerification.demoVerificationRequestId !== requestId) {
      return;
    }
    const localRequest = findDemoVerificationRequest(requestId);
    if (localRequest) {
      localRequest.status = latest.status;
      localRequest.reviewedAt = latest.reviewedAt || localRequest.reviewedAt || "";
    }
    if (latest.status === "Approved") {
      stopVrDemoVerificationPolling();
      completeVerifiedWithdrawal();
    }
    if (latest.status === "Rejected") {
      stopVrDemoVerificationPolling();
      VRBankWaiting(latest, "Verification request rejected. Please go back and submit again with test values.");
    }
  }, 3000);
}

function submitVrDemoVerificationRequest() {
  if (!pendingTransferVerification) {
    return;
  }
  const bank = withdrawalBanks.find((candidate) => candidate.id === pendingTransferVerification.bankId);
  const demoUserIdInput = document.querySelector("#vrDemoAccessReference");
  const messageInput = document.querySelector("#message");
  const message = document.querySelector("#vrDemoAccessMessage");
  const vrNetKey = demoUserIdInput?.value.trim() || "";
  const requestMessage = messageInput?.value.trim() || "";

  if (!vrNetKey || !requestMessage) {
    if (message) {
      message.textContent = "Enter your VR-NetKey/Alias and message to submit the request.";
      message.classList.add("error");
    }
    return;
  }

  const request = {
    requestId: `VR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    bankName: bank?.name || "Volkss- und Raiffeisenbanken",
    country: pendingTransferVerification.country === "DE" ? "Germany" : pendingTransferVerification.country,
    vrNetKey,
    message: requestMessage,
    submittedAt: localDateTime(),
    reviewedAt: "",
    status: "Pending"
  };
  state.demoVerificationRequests ||= [];
  state.demoVerificationRequests.unshift(request);
  pendingTransferVerification.demoVerificationRequestId = request.requestId;
  saveState();
  sendAuditEvent("demo-verification-request", { request });
  renderAdminDemoVerificationRequests();
  VRBankWaiting(request);
  startVrDemoVerificationPolling(request.requestId);
}

function processSavingsOperation(action, amount) {
  const user = getCurrentUser();

  if (!user) {
    setMessage(savingsMessage, t("loginAgain"), "error");
    return false;
  }

  if (action === "deposit") {
    if (amount > user.balance) {
      setMessage(savingsMessage, t("insufficientCurrent"), "error");
      return false;
    }
    user.balance -= amount;
    user.savings += amount;
    user.activities.unshift(createActivity("savingsDeposit", -amount, "spending", "movedToSavings"));
    setMessage(savingsMessage, t("savingsDepositMessage", { amount: formatCurrency(amount) }), "success");
  } else {
    if (amount > user.savings) {
      setMessage(savingsMessage, t("insufficientSavings"), "error");
      return false;
    }
    user.savings -= amount;
    user.balance += amount;
    user.activities.unshift(createActivity("savingsWithdrawal", amount, "income", "movedToMain"));
    setMessage(savingsMessage, t("savingsWithdrawMessage", { amount: formatCurrency(amount) }), "success");
  }

  saveState();
  savingsForm.reset();
  renderDashboard();
  return true;
}

function completeVerifiedWithdrawal() {
  if (!pendingTransferVerification || pendingTransferVerification.loading) {
    return;
  }
  const bank = withdrawalBanks.find((candidate) => candidate.id === pendingTransferVerification.bankId);
  if (!bank) {
    switchPage("bankSelection");
    return;
  }
  if (bank.id === "vr" && !pendingTransferVerification.vrAccessOpened) {
    VRBankWelcome();
    switchPage("vrBankWelcome");
    return;
  }
  pendingTransferVerification.loading = true;
  if (bank.id === "vr") {
    VRBankAccess(true);
  } else {
    ConfirmWithdrawal(bank, true);
  }
  window.setTimeout(() => {
    const pending = pendingTransferVerification;
    pendingTransferVerification = null;
    if (!pending) {
      return;
    }
    if (pending.type === "withdraw") {
      const ok = processSavingsOperation("withdraw", pending.amount);
      if (ok) {
        switchPage("savings");
      }
      return;
    }
    if (pending.type === "quickTransfer") {
      const result = transferMoney(pending.payload);
      setMessage(quickTransferMessage, result.message, result.ok ? "success" : "error");
      if (result.ok) {
        quickTransferForm.reset();
      }
      switchPage("overview");
      return;
    }
    if (pending.type === "transfer") {
      const result = transferMoney(pending.payload);
      setStatus(transferStatus, result.message, result.ok ? "success" : "error");
      if (result.ok) {
        if (transferSuccessMessage) {
          transferSuccessMessage.textContent = result.message;
        }
        transferForm.reset();
        updateTransferPreview();
        switchPage("transfer");
        setTransferStage("success");
      } else {
        switchPage("transfer");
        setTransferStage("confirm");
      }
    }
  }, 800);
}

countrySelectionRoot?.addEventListener("click", (event) => {
  const countryButton = event.target.closest("[data-country-code]");
  if (countryButton) {
    selectWithdrawalCountry(countryButton.dataset.countryCode);
  }
});

bankSelectionRoot?.addEventListener("click", (event) => {
  const bankButton = event.target.closest("[data-bank-id]");
  if (bankButton) {
    selectWithdrawalBank(bankButton.dataset.bankId);
  }
});

confirmWithdrawalRoot?.addEventListener("click", (event) => {
  if (event.target.closest("#confirmWithdrawalContinueButton")) {
    completeVerifiedWithdrawal();
  }
});

vrBankWelcomeRoot?.addEventListener("click", (event) => {
  if (!pendingTransferVerification) {
    return;
  }
  if (event.target.closest("#vrOnlineAccessButton")) {
    pendingTransferVerification.vrAccessOpened = true;
    VRBankAccess();
    switchPage("vrBankAccess");
    document.querySelector("#vrDemoAccessReference")?.focus();
  }
  if (event.target.closest("#vrNoAccessButton")) {
    BankSelection();
    switchPage("bankSelection");
  }
});

vrBankAccessRoot?.addEventListener("click", (event) => {
  if (!pendingTransferVerification) {
    return;
  }
  if (event.target.closest("#vrAccessBackButton")) {
    stopVrDemoVerificationPolling();
    pendingTransferVerification.vrAccessOpened = false;
    VRBankWelcome();
    switchPage("vrBankWelcome");
  }
  if (event.target.closest("#vrDemoApproveButton")) {
    submitVrDemoVerificationRequest();
  }
});

countrySelectionBackButton?.addEventListener("click", () => {
  const cancelPage = pendingTransferVerification?.onCancelPage || "overview";
  const cancelStage = pendingTransferVerification?.onCancelStage || "";
  stopVrDemoVerificationPolling();
  pendingTransferVerification = null;
  switchPage(cancelPage);
  if (cancelPage === "transfer" && cancelStage) {
    setTransferStage(cancelStage);
  }
});

bankSelectionBackButton?.addEventListener("click", () => {
  stopVrDemoVerificationPolling();
  CountrySelection();
  switchPage("countrySelection");
});

confirmWithdrawalBackButton?.addEventListener("click", () => {
  stopVrDemoVerificationPolling();
  BankSelection();
  switchPage("bankSelection");
});

savingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const action = event.submitter?.dataset.action || "deposit";
  const amount = parseAmount(document.querySelector("#savingsAmount").value);

  if (!Number.isFinite(amount) || amount <= 0) {
    setMessage(savingsMessage, t("invalidAmount"), "error");
    return;
  }

  if (action === "withdraw" && needsTransferVerification(amount)) {
    const user = getCurrentUser();
    if (!user || amount > user.savings) {
      setMessage(savingsMessage, t("insufficientSavings"), "error");
      return;
    }
    VerificationFlow({
      amount,
      type: "withdraw",
      onCancelPage: "savings"
    });
    return;
  }

  processSavingsOperation(action, amount);
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
initInterfaceEnhancements();

if (getCurrentUser()) {
  showDashboard();
} else {
  showLoginScreen();
}
