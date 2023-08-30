const AuthService = require('../service/AuthService');
const PatientService = require('../service/PatientService');
const { queryObj } = require('../utils/request');

class AuthController {
  async register(req, res) {
    res.redirect(queryObj('/auth/login', req.query));
  }
  
  login(req, res) {
    res.render('login', req.query);
  }
  
  async postLogin(req, res) {
    const { redirect_uri, state, aud, scope, client_id } = req.body;
    const login = await AuthService.login(req.body);
    if (login.code && login.code === 401) {
      return res.render('login', {
        ...req.body,
        error: login.message,
      });
    }
    if (login.code) {
      return res.redirect(
        queryObj(redirect_uri, {
          state,
          code: login.code,
        })
      );
    }
    if (login.medico) {
      return res.redirect(
        queryObj('/auth/list', {
          redirect_uri,
          state,
          medico_id: login.login._id,
          aud,
          scope,
          client_id,
        })
      );
    }
    return res.redirect(
      queryObj('/auth/authorize', {
        redirect_uri,
        state,
        paciente_id: login.login._id,
        aud,
        scope,
        client_id,
      })
    );
  }

  async list(req, res) {
    const { redirect_uri, state, aud, scope, client_id, medico_id } = req.query;
    const patients = await PatientService.findPatientByPractitioner(medico_id);
    res.render('list', {
      redirect_uri,
      state,
      medico_id,
      aud,
      scope,
      client_id,
      patients,
    });
  }

  async select(req, res) {
    const { redirect_uri, state } = req.body;
    const auth = await AuthService.select(req.body);
    res.redirect(
      queryObj(redirect_uri, {
        state,
        code: auth.code,
      })
    );
  }

  authorize(req, res) {
    res.render('auth', req.query);
  }

  async postAuthorize(req, res) {
    const { redirect_uri, state } = req.body;
    const auth = await AuthService.authorize(req.body);
    res.redirect(
      queryObj(redirect_uri, {
        state,
        code: auth.code,
      })
    );
  }

  async token(req, res) {
    res.json(await AuthService.token(req.body));
  }
}

module.exports = new AuthController();