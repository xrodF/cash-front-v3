import { Fragment } from "react";

import { Box } from "@mui/material";

import { CustomPaper } from "@components/shared/styled";
import CustomTable from "@components/shared/custom-table";
import { useGlobalContext } from "@/context/global";
import {
  CurrencyImages,
  localeStringData,
  TranslateCodeCurrency,
} from "@/enums/currency";
import { CustomTableRow } from "@components/shared/custom-table/styled";

const ExchangeDetails = () => {
  const { global_context } = useGlobalContext();

  return (
    <CustomPaper
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <CustomTable>
        <Fragment>
          {global_context.exchange
            .filter((x) => !x.abreviation.toLowerCase().includes("usd"))
            .map((x) => (
              <CustomTableRow
                key={x.abreviation}
                header={
                  <Fragment>
                    <Box
                      component="img"
                      src={
                        CurrencyImages[
                          x.abreviation.toLowerCase().includes("pix")
                            ? "PIX"
                            : x.abreviation
                        ]
                      }
                      sx={{
                        height: 20,
                      }}
                    />
                    {
                      TranslateCodeCurrency[
                        x.abreviation.toLowerCase().includes("pix")
                          ? "PIX"
                          : x.abreviation
                      ]
                    }
                  </Fragment>
                }
                value={parseFloat(x.last_value.toString()).toLocaleString(
                  localeStringData[
                    x.abreviation.toLowerCase().includes("pix")
                      ? "PIX"
                      : x.abreviation.toUpperCase()
                  ].locales,
                  localeStringData[
                    x.abreviation.toLowerCase().includes("pix")
                      ? "PIX"
                      : x.abreviation.toUpperCase()
                  ].options
                )}
              />
            ))}
        </Fragment>
      </CustomTable>
    </CustomPaper>
  );
};

export default ExchangeDetails;
