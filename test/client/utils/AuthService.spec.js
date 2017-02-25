import _ from "lodash";
import proxyquire from "proxyquire";
import setup from "../../setup";

describe("AuthService", () => {
    const {expect, sandbox, chance} = setup();

    const stubAuth0Lock = () => {
        const Auth0Lock = function () {
        };
        Auth0Lock.on = sandbox.stub();
        Auth0Lock.getUserInfo = sandbox.stub();
        Auth0Lock.show = sandbox.stub();
        return Auth0Lock;
    };

    const stubEvents = () => ({
        EventEmitter: function () {
        }
    });

    const init = () => {
        const events = stubEvents();
        const jwtHelper = {isTokenExpired: sandbox.stub()};
        const reactRouter = {browserHistory: sandbox.stub()};
        const Auth0Lock = stubAuth0Lock();

        const stubs = {
            "./jwtHelper": jwtHelper,
            "react-router": reactRouter,
            Auth0Lock,
            events
        };

        const AuthService = proxyquire("../../../src/client/utils/AuthService", stubs).default;

        return {
            AuthService,
            jwtHelper,
            reactRouter,
            Auth0Lock,
            events
        };
    };

    let restoreGlobal;

    beforeEach(() => {
        restoreGlobal = {
            localStorage: global.localStorage,
            __IS_PROD__: global.__IS_PROD__
        };

        global.localStorage = {
            getItem: sandbox.stub(),
            setItem: sandbox.stub(),
            removeItem: sandbox.stub(),
            profile: ""
        };
    });

    afterEach(() => {
        _.each(restoreGlobal, (value, key) => global[key] = value);
    });

    it("logout should remove id_token and profile from local storage", () => {
        const {AuthService} = init();

        AuthService.logout();

        expect(global.localStorage.removeItem).to.have.been.calledWith("id_token");
        expect(global.localStorage.removeItem).to.have.been.calledWith("profile");
    });

    it("getToken should retrieve token form local storage", () => {
        const {AuthService} = init();

        const token = chance.guid();
        global.localStorage.getItem.withArgs("id_token").returns(token);

        expect(AuthService.getToken()).to.equal(token);
    });

    it("setToken should set id_token to local storage", () => {
        const {AuthService} = init();

        const token = chance.guid();
        AuthService.setToken(token);

        expect(global.localStorage.setItem).to.have.been.calledWith('id_token', token);
    });

    describe("loggedIn", () => {
        const when = ({
            isProd,
            bypassAuth,
            tokenExists,
            tokenExpired
        }) => {
            global.__IS_PROD__ = isProd;
            global.__BYPASS_AUTH__ = bypassAuth;

            const token = tokenExists ? chance.guid() : undefined;
            global.localStorage.getItem
                .withArgs('id_token').returns(token);

            const {AuthService, jwtHelper: {isTokenExpired}} = init();
            isTokenExpired.withArgs(token).returns(tokenExpired);

            return AuthService;
        };

        it("should return true when non-prod and bypass auth (even if there is no auth token)", () => {
            const AuthService = when({
                isProd: false,
                bypassAuth: true,
                tokenExists: false,
                tokenExpired: true
            });

            expect(AuthService.loggedIn()).to.be.true();
        });

        it("should not be logged in when there is no auth token", () => {
            const AuthService = when({
                isProd: true,
                bypassAuth: false,
                tokenExists: false
            });

            expect(AuthService.loggedIn()).to.be.false();
        });

        it("should not be logged in when auth token is expired", () => {
            const AuthService = when({
                isProd: true,
                bypassAuth: false,
                tokenExists: true,
                tokenExpired: true
            });

            expect(AuthService.loggedIn()).to.be.false();
        });

        it("should be logged in when auth token is not expired", () => {
            const AuthService = when({
                isProd: true,
                bypassAuth: false,
                tokenExists: true,
                tokenExpired: true
            });

            expect(AuthService.loggedIn()).to.be.false();
        });
    });
});
