import proxquire from "proxyquire";
import setup from "../../setup";

proxquire.noCallThru();

describe("court-case-stakeholders", () => {
    const {sandbox, chance, expect} = setup();

    const transacting = "this is a bookshelf transaction object";
    const models = {
        bookshelf: {
            transaction: sandbox.spy((fn) => fn(transacting))
        },
        Stakeholder: {
            where: sandbox.stub()
        }
    };

    const courtCase = {
        fetchCaseById: sandbox.stub()
    };

    const courtbot = {
        registerStakeholderWithCourtbot: sandbox.stub().returns(Promise.resolve())
    };

    const deps = {
        "./models": models,
        "./court-case": courtCase,
        "../courtbot": courtbot
    };

    const stakeholders = proxquire.noCallThru()('../../../src/server/db/court-case-stakeholders', deps);

    const stubFetchStakeholder = () => {
        const stakeholder = chance.stakeholder();
        models.Stakeholder.where.withArgs({id: stakeholder.id}).returns({
            fetch: sandbox.stub().returns(Promise.resolve(stakeholder))
        });
        return stakeholder;
    };

    it("getStakeholderById", () => {
        const stakeholder = stubFetchStakeholder();

        return expect(stakeholders.getStakeholderById(stakeholder.id)).to.eventually().equal(stakeholder);
    });

    it("updateStakeholder", () => {
        const stakeholder = stubFetchStakeholder();
        const update = chance.stakeholder({id: stakeholder.id});

        const save = sandbox.stub().returns(Promise.resolve(update));
        stakeholder.set = sandbox.stub().withArgs(stakeholder).returns({save});

        return expect(stakeholders.updateStakeholder(update)).to.be.fulfilled()
            .then((actualStakeholder) => {
                expect(actualStakeholder).to.equal(update);
                expect(save).to.have.been.called();
                expect(stakeholder.set).to.have.been.called();
            });
    });


    describe("createStakeholder", () => {
        const attach = sandbox.stub();

        const stubAttach = (stakeholderToCreate) => {
            const createdStakeholder = chance.stakeholder();
            attach.withArgs(stakeholderToCreate, {transacting})
                .returns(Promise.resolve({
                    head: sandbox.stub().returns(createdStakeholder)
                }));
            return createdStakeholder;
        };

        const stubFetchCaseById = (courtCaseId) => {
            const savedCourtCase = {
                ...chance.courtCase(),
                stakeholders: () => ({attach})
            };

            courtCase.fetchCaseById.withArgs(courtCaseId)
                .returns(Promise.resolve(savedCourtCase));

            return savedCourtCase;
        };

        it("should create stakeholder", () => {
            const stakeholderToCreate = stubFetchStakeholder();
            stubAttach(stakeholderToCreate);
            stubFetchCaseById(stakeholderToCreate.courtCaseId);

            return expect(stakeholders.createStakeholder(stakeholderToCreate)).to.be.fulfilled()
                .then(() => expect(attach).to.have.been.calledWith(stakeholderToCreate));
        });

        it("should rollback transaction if courtbot registration fails", () => {
            const stakeholderToCreate = stubFetchStakeholder();
            stubAttach(stakeholderToCreate);
            stubFetchCaseById(stakeholderToCreate.courtCaseId);
            courtbot.registerStakeholderWithCourtbot.returns(Promise.reject(new Error("courtbot registration failed")));

            return expect(stakeholders.createStakeholder(stakeholderToCreate)).to.be.rejected();
        });
    });
});
