import i18n from "i18next";
import { reactI18nextModule } from 'react-i18next';
import Backend from 'i18next-chained-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import ReduxDetector from 'i18next-redux-languagedetector';

const Detector = new LanguageDetector();
Detector.addDetector(ReduxDetector);

i18n.use(Backend).use(Detector).use(reactI18nextModule).init({
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
                'return home': 'return home',
                'This may take a few seconds' : 'This may take a few seconds'
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
                'return home': 'retour',
                'This may take a few seconds' : 'Cela peut prendre quelques secondes'
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