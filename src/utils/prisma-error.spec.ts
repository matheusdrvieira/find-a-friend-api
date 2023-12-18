import { PRISMA_UNIQUE_KEY_EXECEPTION_CODE } from "@/infra/database/prisma/constants/prisma.constants";
import { describe, expect, it } from "vitest";
import { isUniqueKeyContraintException } from "./prisma-errors";

describe("isUniqueKeyContraintException", async () => {
    it("should be able return true for a unique key exception", () => {
        const result = isUniqueKeyContraintException({ code: PRISMA_UNIQUE_KEY_EXECEPTION_CODE, });

        expect(result).toBe(true);
    });

    it("should be able return false for a unique key exception", async () => {
        const result = isUniqueKeyContraintException({ code: "another code", });

        expect(result).toBe(false);
    });
});
