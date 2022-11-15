import {StylesConfig} from "react-select";
import {useField, Field} from "formik";
import Select from 'react-select'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {env} from "../../../../env";

type Props = {
    name: string;
    controller: string;
    placeholder: string;
}

type SelectType = {
    label: string;
    value: string;
}

const selectStyle: StylesConfig<any, true> = {
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
            borderRadius: "0.475rem",
            fontWeight: "500",
            cursor: "text"
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

const AutoCompleteInput = ({name, controller, placeholder}: Props) => {
    const [field, meta, helpers] = useField(name);
    const [input, setInput] = useState("");
    const [firstRender,setFirstRender] = useState(true);
    const [isOpen,setIsOpen] = useState(false);
    const [options,setOptions] = useState<Array<SelectType>>()
    if (!field.value){field.value = ""}
    useEffect(()=>{
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

    } ,[])

    if (typeof options === "undefined"){
        return (<Field type='text' className='form-control form-control-lg form-control-solid' placeholder='' name='disabled' disabled={true}/>);
    }

    return (
        <>
            {/*Gerçekten gerekmedikçe aşağıda herhangi bir değişiklik yapmayın.*/}
            <Select name={name}
                    options={options}
                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                    styles={selectStyle}
                    placeholder={placeholder}
                    inputValue={firstRender ? field.value.toString() : input}
                    isClearable={true}
                    onChange={(value:any, action) => {
                        if (action.action === 'clear') {
                            setInput("");
                        }
                        setFirstRender(false)
                        value && setInput(value.label);
                        setIsOpen(false)
                    }}
                    onInputChange={(value, action) => {
                        if (action.action === "input-change") {
                            setIsOpen(true)
                            setFirstRender(false);
                            setInput(value);
                        }
                    }}
                    onBlur={() => {
                        helpers.setTouched(true)
                        helpers.setValue(input);
                        setIsOpen(false)
                    }}
                    onMenuOpen={() => setIsOpen(true)}
                    onKeyDown = {(e)=>{
                        if (e.keyCode === 13) {
                            helpers.setValue(input);
                        }
                    }}
                    menuIsOpen={isOpen}
                    // openMenuOnClick={true}
                    closeMenuOnSelect={false}
                    noOptionsMessage={()=> null}
            />
        </>
    );
};

export {AutoCompleteInput}