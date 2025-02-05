const errorMessages: Record<string, string> = {
    "auth/invalid-credential": "Credenciais inválidas. Verifique seu email e senha.",
    "auth/user-not-found": "Usuário não encontrado. Verifique seu email ou crie uma conta.",
    "auth/wrong-password": "Senha incorreta. Tente novamente.",
    "auth/email-already-in-use": "Este email já está cadastrado. Faça login ou use outro email.",
    "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
    "auth/too-many-requests": "Muitas tentativas. Aguarde um momento e tente novamente.",
    "auth/network-request-failed": "Falha na conexão. Verifique sua internet.",
    "auth/popup-closed-by-user": "O login foi cancelado. Tente novamente.",
    "auth/cancelled-popup-request": "Múltiplos pop-ups bloqueados. Feche e tente novamente.",
};

export const getFirebaseErrorMessage = (errorCode: string): string => {
    return errorMessages[errorCode] || "Ocorreu um erro desconhecido.";
};
