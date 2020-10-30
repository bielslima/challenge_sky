module.exports = {
    mensagem: (codigo) => {
        switch (codigo) {
            case 11000:
                return 'E-mail já existente!';
            default:
                return 'Erro não identificado!';
        }
    }
}