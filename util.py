import datetime


def getDeptName(deptCode: str):
    departmentCode = dict(
        FA1="일반공지",
        FA2="학사공지",
        FA34="직원채용",
        FA35="창업공지",
    )
    return departmentCode.get(deptCode)
