import Swal from 'sweetalert2'
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

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success m-2',
      cancelButton: 'btn btn-danger m-2',
    },
    buttonsStyling: false,
    heightAuto: false
  })


export default function commonSweetAlert2Confirm (state: boolean, message: string) {
    const intl = createIntl({ locale: getConfig().selectedLang, messages: allMessages[getConfig().selectedLang] }, )
    return (
        swalWithBootstrapButtons.fire({
            text: message.startsWith("@Excel") ?
                message.split(" ").map(i => intl.messages[i] ? intl.messages[i] : i).join(' ').substring("@Excel".length)
                : intl.formatMessage({id: message}),
            icon: state ? 'success' : 'error',
            showConfirmButton: false,
            showCancelButton: state ? false : true,
            cancelButtonText: 'Tamam',
            reverseButtons: true,
            timer: state ? 3000 : 0
            })
    )
}