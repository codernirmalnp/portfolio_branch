import React from "react";
import {
    useController,
    UseControllerProps,
    FieldValues,
} from "react-hook-form";
type InputProps = {
    name: string;
    control: any;
    placeholder: string;
    label: string;
    icon?: React.ReactNode;
    rows:number,
    cols:number,
    classes?: {
        input?: string;
        label?: string;
        root?: string;
        error?: string;
    };
};
export type Props<T extends FieldValues> = InputProps & UseControllerProps<T>;
const TextAreaField = <T extends FieldValues>({
    control,
    name,
    placeholder,
    classes,
    label,
    icon,
    rows,
    cols
}: Props<T>) => {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { isTouched, error },
    } = useController({
        name,
        control,
    });
    return (
        <div className={classes?.root}>
            <label htmlFor={label} className={classes?.label}>
                {label}
            </label>
            <textarea
                className={classes?.input}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
                value={value} // input value
                name={name} // send down the input name
                ref={ref} // send input ref, so we can focus on input when error appear
            />
            <span className="input-icon">{icon && icon}</span>

            {error ? <p className={classes?.error}>{error?.message}</p> : null}
        </div>
    );
};
export default TextAreaField;
