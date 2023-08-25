"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificaToken = void 0;
var jwt = require('jsonwebtoken');
const CHAVE_SECRETA = process.env.CHAVE_SECRETA_JWT;
function VerificaToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'Nenhum token informado.' });
    jwt.verify(token, CHAVE_SECRETA, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });
        req.userId = decoded.id;
        next();
    });
}
exports.VerificaToken = VerificaToken;
