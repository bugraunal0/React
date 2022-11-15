import {StylesConfig} from "react-select";
import {useField} from "formik";
import Select from 'react-select'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {env} from "../../../../env";

type Props = {
    name: string;
    controller: string;
    placeholder: string;
    onChange?: Function;
    onKeyDown?: Function;
    isValueNumber?: boolean;
    param?: string;
}

export type MultiSelectType = {
    label: string;
    value: string;
};

const selectStyle: StylesConfig<MultiSelectType, true> = {
    control: (provided, _state) => {
        return {
            ...provided,
            backgroundColor: "#F5F8FA",
            borderColor: "#F5F8FA",
            color: "white",
            border: 0,
            boxShadow: 'none',
            fontSize: 14,
            paddingTop: "min(0.550rem, 0.8%)",
            paddingBottom: "min(0.550rem, 0.8%)",
            paddingLeft: "0.8rem",
            paddingRight: "0.8rem",
            borderRadius: "0.475rem",
            fontWeight: "500",
        }
    },
    container: (provided, _state) => {
        return {
            ...provided,
            width: "100%",
        }
    },
    multiValueLabel: (provided, _state) => {
        return {
            ...provided,
            backgroundColor: "#e4e6ef",
            borderRadius: "0.4rem"
        }
    },
    multiValueRemove: (provided, _state) => {
        return {
            ...provided,
            backgroundColor: "#e4e6ef",
            color: "#5e6278",
            "&:hover": {
                color: "#009ef7",
                backgroundColor: "#e4e6ef",
                transition: "0.2s",
            },
        }
    },
    menu: (provided) => {
        return {
            ...provided,
            backgroundColor: "#f5f8fa",
            fontFamily: 'inherit',
            fontSize: 14,
        }
    },
    option: (provided, state) => {
        return {
            ...provided,
            backgroundColor:
                (state.isSelected && "#009ef7") ||
                (state.isFocused && "#f1faff") ||
                'white',
            color:
                (state.isSelected && "white") ||
                (state.isFocused && "#009ef7") ||
                'black',
            transition: "0.3s",
            "&:hover": {
                backgroundColor:
                    (state.isSelected && "#009ef7") ||
                    (state.isFocused && "#f1faff") ||
                    '#f1faff',
                color:
                    (state.isSelected && "white") ||
                    (state.isFocused && "#009ef7") ||
                    '#009ef7',
                transition: "0.3s",
            },

        };
    },
    placeholder: (provided) => {
        return {
            ...provided,
            color: "#a1a5b7"
        }
    },
};

const MultiSelectCombobox = ({name, controller, placeholder, onChange, onKeyDown, param = "0", isValueNumber = true}: Props) => {
    const [field, meta, helpers] = useField(name);
    const [options,setOptions] = useState<Array<MultiSelectType>>()

    useEffect(() => {
        let antiMemLeak = true;
        axios.get(`${env.REACT_APP_BACKEND_API_URL}/${controller}`).then((response) => {
            if (antiMemLeak) {
                if (typeof response !== "undefined")
                    setOptions(response.data.data);
            }
        });
        return () => {
            antiMemLeak = false;
        };

    } ,[param])

    return (
        <>
            <Select name={name}
                    value={field.value && (options && options.filter(f => field.value.includes(isValueNumber ? Number(f.value) : f.value)))} //Number(f.value)
                    onChange={(val: any) => {
                        Object.keys(val).length > 0 ? helpers.setValue(val.map((m: MultiSelectType) => isValueNumber ? Number(m.value) : m.value)) : helpers.setValue([]);
                        onChange && (val ? onChange(val) : onChange({value: "", label: ""}))
                    }}
                    onKeyDown={(e: any) => { onKeyDown && onKeyDown(e) }}
                    components={{IndicatorSeparator: () => null}}
                    closeMenuOnSelect={false}
                    onBlur={() => {
                        helpers.setTouched(true)
                    }}
                    isMulti={true}
                    options={options}
                    styles={selectStyle}
                    placeholder={placeholder}
                    hideSelectedOptions={false}
                    noOptionsMessage={()=> null}
            />
        </>
    );
};

export {MultiSelectCombobox}