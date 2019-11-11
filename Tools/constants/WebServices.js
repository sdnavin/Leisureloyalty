export default {
    MainURL:'https://webapi.leisure.qa/',//'http://10.10.130.62:8989/',//
    CreateProfile:'api/Member/CreateMember',
    VerifyMemberOTP:'api/Member/VerifyMobileOTP?MemberID={MemberID}&OTPCode={OTPCode}',
    CreatePass:'api/Member/CreatePassword?MemberID={MemberID}&Password={Password}',
    // Login:'api/Member/Login?MobileOrEmail={MobileOrEmail}&Password={Password}&IsMobile={IsMobile}',
    Login:'token',
    RefreshToken:'token',
    VerifyLoginOTP:'api/Member/LoginMobileOTP',
    
    ProfileDetails:'api/Member/MemberProfile?MemberID={MemberID}',
    UpdateProfile:'api/Member/UpdateProfile?MemberID={MemberID}',
    ClaimPoints:'api/Member/ClaimPoints?MemberID={MemberID}&InvoiceCode={InvoiceCode}',
    ClaimsProfile:'api/Member/ClaimPointHistory?MemberID={MemberID}',

    RedeemPoints:'api/Member/RedeemVoucher?MemberID={MemberID}&VoucherId={VoucherId}&PassCode={PassCode}',
    RedeemDetails:'api/Member/MemberRedeemDetails?MemberID={MemberID}',

    base64Ios:'RkU1QzM2RUYtOEJDNy00QkVDLUEyOUMtMkFCNzc2QjgxOUJDOkU4RUEwRjlDLUZDRjgtNEEwQi1CRjE2LTg1QTVGQ0I0RUE3MA==',
    base64And:'QzcwOTNEQTAtRUU0Ri00RDkyLUIyNjktQTk4QjY5RTg1ODM2OkNCQjA0MTNCLTVGODUtNEFGRi1CQUNGLTJBNzRDMTIyQjJDMQ==',

    parkData:'https://www.leisure.qa/assets/parkDetails-M.txt',
    faq:'https://www.leisure.qa/assets/faq.txt',
    resetPass:'https://www.leisure.qa/En/ChangePassword',
    bannerData:'https://www.leisure.qa/assets/banner.txt',

};
