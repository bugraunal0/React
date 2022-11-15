import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import enMessages from '../../../_metronic/i18n/messages/en.json';
import trMessages from '../../../_metronic/i18n/messages/tr.json';
import {createIntl} from "react-intl";

const allMessages = {
    en: enMessages,
    tr: trMessages,
}

const I18N_CONFIG_KEY = process.env.REACT_APP_I18N_CONFIG_KEY || 'i18nConfig'

type Props = {
    selectedLang: 'en' | 'tr'
}
const initialState: Props = {
    selectedLang: 'tr',
}

function getConfig(): Props {
    const ls = localStorage.getItem(I18N_CONFIG_KEY)
    if (ls) {
        try {
            return JSON.parse(ls) as Props
        } catch (er) {
            console.error(er)
        }
    }
    return initialState
}

const MySwal = withReactContent(Swal);

export default function* commonSweetAlert2(
    state: boolean,
    message: string,
    time: number
) : any {
    const intl = createIntl({ locale: getConfig().selectedLang, messages: allMessages[getConfig().selectedLang] }, )
    if (state){
        yield MySwal.fire({
            position: "center",
            icon: "success",
            timer: time,
            text: intl.formatMessage({id: message}),
            showConfirmButton: false,
            heightAuto: false
        });
    }
    else{
        yield MySwal.fire({
            position: "center",
            icon: "error",
            text: message.startsWith("SWEETALERT.COMMON.ERROR_OCCURRED") ?
                message.split(" ").map(i => intl.messages[i] ? intl.messages[i] : i).join(' ')
                : intl.formatMessage({id: message}),
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: intl.formatMessage({id: 'COMMON.OK'}),
            heightAuto: false
        });
    }
}