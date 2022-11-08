import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

i18n.use(detector).use(reactI18nextModule).init({
    resources: {
        en: {
            translation: {
                'Light/Dark': "Light/Dark",
                'Eth. Decentralized Wallet': 'Eth. Decentralized Wallet',
                'Connect wallet to start': 'Connect wallet to start',
                'Connect Wallet': 'Connect Wallet',
                'YOUR ACCOUNT': 'YOUR ACCOUNT',
                'YOUR BALANCE': 'YOUR BALANCE',
                'on': 'on',
                'network': 'network',
                'Disconnect': 'Disconnect',
                'Check transactions': 'Check transactions',
                'LAST TRANSACTIONS' : 'LAST TRANSACTIONS',
                'return home': 'return home'
            },
        },
        fr: {
            translation: {
                'Light/Dark': "Clair/Sombre",
                'Eth. Decentralized Wallet': 'Mon Portefeuille Décentralisé',
                'Connect wallet to start': 'Connecter Metamask pour démarrer',
                'Connect Wallet': 'Me connecter',
                'YOUR ACCOUNT': 'MON ADRESSE',
                'YOUR BALANCE': 'MON SOLDE ETH',
                'on': 'sur',
                'network': '',
                'Disconnect': 'Me déconnecter',
                'Check transactions': 'Mes transactions',
                'LAST TRANSACTIONS' : 'VOS DERNIÈRES TRANSACTIONS',
                'return home': 'retour'
            },
        },
    },
    lng: "en",
    interpolation: {
        escapeValue: false,
    },
    debug: true
});

export default i18n;