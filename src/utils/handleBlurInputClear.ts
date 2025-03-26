const handleBlurInputClear = <T extends Record<string, any>>(
    field: keyof T,
    setValue: (field: keyof T, value: string, options?: any) => void,
    clearErrors: (field: keyof T) => void,
    errors: Record<keyof T, { message?: string } | undefined>
) => {
    return () => {
        if (errors[field]?.message) {
            setValue(field, "", { shouldValidate: false });
            clearErrors(field);
        }
    };
};

export default handleBlurInputClear;