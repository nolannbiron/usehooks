import React from "react";

type Copied = string | null;
type SetCopy = (text: string) => Promise<boolean>;

const useCopyToClipboard = (): [Copied,  SetCopy] => {

    const [value, setValue] = React.useState<Copied>(null);

    const copy: SetCopy = async (text: string) => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not found')
            return false
        }

        try{
            navigator.clipboard.writeText(text)
            setValue(text);
            return true;
        }catch(err: any){
            setValue(null);
            return false;
        }

    }

    return [value, copy]
}

export default useCopyToClipboard;