import { PRISMA_UNIQUE_KEY_EXECEPTION_CODE } from "@/infra/database/prisma/constants/prisma.constants";

export function isUniqueKeyContraintException(err: any) { // eslint-disable-line

    return err.code == PRISMA_UNIQUE_KEY_EXECEPTION_CODE;
}
