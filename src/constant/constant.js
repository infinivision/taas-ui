/*
* author: wancheng
* date: 2018-12-18
* desc: 
*/


//
function _getArray2(array) {
    array = array || [];
    var result = [
        {
            value: undefined, title: 'All'
        }
    ];
    //
    array.forEach(function (item, index) {
        var temp = {
            value: index, title: item
        };
        result.push(temp);
    });

    return result;
}

//
function _getObject(array) {
    var result = {};

    array.forEach(function (item, index) {
        result[item] = index;
    });

    return result;
}


// global status
export const GLOBAL_STATUS_ARRAY = ['Unknown', 'Begin', 'Committing', 'RetryCommitting', 'Rollbacking', 'RetryRollbacking', 'RollbackingSinceTimeout', 'RetryRollbackingSinceTimeout', 'Committed', 'CommitFailed', 'Rollbacked', 'RollbackFailed', 'RollbackedSinceTimeout', 'RollbackFailedSinceTimeout', 'Finished'];


export const GLOBAL_STATUS_ARRAY2 = _getArray2(GLOBAL_STATUS_ARRAY);


export const GLOBAL_STATUS_OBJECT = _getObject(GLOBAL_STATUS_ARRAY);

// branch status
export const BRANCH_STATUS_ARRAY = ['Unknown', 'Registered', 'PhaseOneDone', 'PhaseOneFailed', 'PhaseOneTimeout', 'PhaseTwoCommitted', 'PhaseTwoCommitFailedRetriable', 'PhaseTwoCommitFailedUnretriable', 'PhaseTwoRollbacked', 'PhaseTwoRollbackFailedRetriable', 'PhaseTwoRollbackFailedUnretriable'];


export const BRANCH_STATUS_ARRAY2 = _getArray2(BRANCH_STATUS_ARRAY);

export const BRANCH_STATUS_OBJECT = _getObject(BRANCH_STATUS_ARRAY);

// action
export const ACTION_ARRAY = ['none', 'rollback', 'commit'];

export const ACTION_ARRAY2 = _getArray2(ACTION_ARRAY);


export const BRANCH_STATUS = {
    Registered: 1,
    PhaseOne: 2,
    PhaseTwo: 3
};

//
export const RESULT_STATUS = {
    success: 1,
    error: 2
};

export const BRANCH_TYPE_ARRAY = ['AT', 'MT'];

export const BRANCH_TYPE_OBJECT = _getObject(BRANCH_TYPE_ARRAY);
