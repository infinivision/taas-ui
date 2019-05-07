import {BRANCH_STATUS, BRANCH_STATUS_OBJECT, GLOBAL_STATUS_OBJECT} from '~/constant/constant';

//
function _formatBranchList(branchList) {
    branchList = branchList || [];
    var result = [];

    //
    branchList.forEach(function (branch) {
        var tempItem = {
            id: branch.id,
            gid: branch.g,
            // resourceManager: branch.r,
            rmsId:branch.r,
            resource:branch.rs,
            lockKeyList: branch.l,
            startAt: branch.s,
            status: branch.st
        };

        //
        var dangerousArray = [BRANCH_STATUS_OBJECT.Unknown,
            BRANCH_STATUS_OBJECT.PhaseOneFailed,
            BRANCH_STATUS_OBJECT.PhaseOneTimeout,
            BRANCH_STATUS_OBJECT.PhaseTwoCommitFailedUnretriable,
            BRANCH_STATUS_OBJECT.PhaseTwoRollbackFailedUnretriable];

        //
        var warningArray = [BRANCH_STATUS_OBJECT.PhaseTwoCommitFailedRetriable,
            BRANCH_STATUS_OBJECT.PhaseTwoRollbackFailedRetriable];

        // dangerous
        if (dangerousArray.includes(tempItem.status)) {
            tempItem.statusDangerous = true;
        }
        // warning
        else if (warningArray.includes(tempItem.status)) {
            tempItem.statusWarning = true;
        }

        //
        var successArray = [BRANCH_STATUS_OBJECT.PhaseTwoCommitted];

        if (successArray.includes(tempItem.status)) {
            tempItem.statusSuccess = true;
        }

        //
        result.push(tempItem);
    });

    return result;
}

//
function formatServerItem(item) {
    var tempItem = {
        id: item.id,
        name: item.n,
        timeout: item.t,
        creator: item.c,
        startAt: item.s,
        status: item.st,
        proxy:item.p,
        action: item.a,
        branchList: _formatBranchList(item.bs),
        branchOpen: false,
        branchRegistered: 0,
        branchPhaseOne: 0,
        branchPhaseTwo: 0
    };

    var registeredCount = 0;
    var phaseOneCount = 0;
    var phaseTwoCount = 0;
    var successCount = 0;
    //
    tempItem.branchList.forEach(function (branch) {
        var status = _getBranchStatus(branch.status);

        if (status === BRANCH_STATUS.Registered) {
            registeredCount += 1;
        } else if (status === BRANCH_STATUS.PhaseTwo) {
            phaseTwoCount += 1;
        } else if (status === BRANCH_STATUS.PhaseOne) {
            phaseOneCount += 1;
        }

        //
        if (branch.statusSuccess) {
            successCount += 1;
        }
    });

    // 状态二 will NOT change any more.
    // 完成状态
    var finalArray = [GLOBAL_STATUS_OBJECT.Committed,
        GLOBAL_STATUS_OBJECT.CommitFailed,
        GLOBAL_STATUS_OBJECT.Rollbacked,
        GLOBAL_STATUS_OBJECT.RollbackFailed,
        GLOBAL_STATUS_OBJECT.RollbackedSinceTimeout,
        GLOBAL_STATUS_OBJECT.RollbackFailedSinceTimeout,
        GLOBAL_STATUS_OBJECT.Finished];


    // 报错
    var dangerousArray = [GLOBAL_STATUS_OBJECT.RetryCommitting,
        GLOBAL_STATUS_OBJECT.CommitFailed,
        GLOBAL_STATUS_OBJECT.RollbackFailed];

    // 告警
    var warningArray = [GLOBAL_STATUS_OBJECT.RollbackingSinceTimeout,
        GLOBAL_STATUS_OBJECT.RetryRollbackingSinceTimeout,
        GLOBAL_STATUS_OBJECT.RollbackedSinceTimeout,
        GLOBAL_STATUS_OBJECT.RollbackFailedSinceTimeout];


    var successArry = [GLOBAL_STATUS_OBJECT.Committed];


    // 完成状态
    if (finalArray.includes(tempItem.status)) {
        tempItem.statusFinal = true;
    }

    //
    if (dangerousArray.includes(tempItem.status)) {
        tempItem.statusDangerous = true;
    } else if (warningArray.includes(tempItem.status)) {
        tempItem.statusWarning = true;
    } else if (successArry.includes(tempItem.status)) {
        tempItem.statusSuccess = true;
    }


    //
    tempItem.branchRegistered = registeredCount;
    tempItem.branchPhaseOne = phaseOneCount;
    tempItem.branchPhaseTwo = phaseTwoCount;
    tempItem.isAllBranchSuccess = successCount === tempItem.branchList.length;

    return tempItem;
}

function formatServerList(data) {
    data = data || [];
    var result = [];

    data.forEach(function (item) {
        let tempItem = formatServerItem(item);
        result.push(tempItem);
    });

    return result;
}

function _getBranchStatus(status) {
    var result;

    if (status === 1) {
        result = BRANCH_STATUS.Registered;
    } else {
        if (status > 1 && status < 5) {
            result = BRANCH_STATUS.PhaseOne
        } else if (status > 4) {
            result = BRANCH_STATUS.PhaseTwo
        }
    }
    return result;
}


function _getGlobalBranchStatus(status) {

}


export {
    formatServerItem,
    formatServerList
}


