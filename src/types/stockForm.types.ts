export interface MessageAlertProps {
    message: {
        type: 'success' | 'error';
        text: string;
    } | null;
    setMessage: React.Dispatch<React.SetStateAction<{ type: 'success' | 'error'; text: string } | null>>;
}