def getDeptName(deptCode: str):
    departmentCode = dict(
        FA1="일반공지"
    )
    return departmentCode.get(deptCode)
