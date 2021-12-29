export var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["Accepted"] = 110] = "Accepted";
    UserStatus[UserStatus["Refused"] = 118] = "Refused";
    UserStatus[UserStatus["InitState"] = 119] = "InitState";
    UserStatus[UserStatus["ToBeActivated"] = 117] = "ToBeActivated";
})(UserStatus || (UserStatus = {}));
export var AdviserDoctorStatus;
(function (AdviserDoctorStatus) {
    AdviserDoctorStatus["FREE"] = "FREE";
    AdviserDoctorStatus["WAITING"] = "\u5F85\u786E\u8BA4";
    AdviserDoctorStatus["CONFIRMED"] = "\u5DF2\u6DFB\u52A0";
})(AdviserDoctorStatus || (AdviserDoctorStatus = {}));
export var croStatus;
(function (croStatus) {
    croStatus[croStatus["Running"] = 1002] = "Running";
    croStatus[croStatus["Stopping"] = 1001] = "Stopping";
})(croStatus || (croStatus = {}));
export default UserStatus;
