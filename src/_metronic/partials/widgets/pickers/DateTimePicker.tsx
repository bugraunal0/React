import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";
import { Turkish } from 'flatpickr/dist/l10n/tr.js';
import {useField} from "formik";

type Props = {
    name: string;
    placeholder: string;
    localization?: {};
    enableTime?: boolean;
    onChange?: Function;
}

const DateTimePicker = ({name, placeholder, localization=Turkish, enableTime=false}: Props) => {
    const [field, meta, helpers] = useField(name);
    // Props verileceği zaman options altında verilmeli. Doğrudan verince düzgün çalışmıyor.
    return (
        <>
            <Flatpickr
                className='form-control form-control-lg form-control-solid'
                data-enable-time={enableTime}
                value={field.value}
                options={{
                    defaultHour: 0,
                    defaultMinute: 0,
                    defaultSeconds: 0,
                    enableSeconds: enableTime,
                    altInput: true,
                    altFormat: enableTime ? "j F Y H:i:S" : "j F Y",
                    locale: localization === Turkish ? Turkish : localization,
                    time_24hr: true,
                    onChange: ([_date],value)=> enableTime ? helpers.setValue(value) : helpers.setValue(value.split(" ")[0])
                }}
                placeholder={placeholder}
                onClose={() => {helpers.setTouched(true)}}
            />
        </>
    );
};

export {DateTimePicker}