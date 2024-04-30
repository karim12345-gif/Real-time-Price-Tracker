import { renderHook } from "@testing-library/react-hooks";
import { useTheme } from "@mui/material/styles";
import { UseBgColor } from "../../hook";
import { hexToRGBA } from "../../components/utils/hex-to-rgba";
import { expect } from "vitest";

describe("UseBgColor hook", () => {
  test("UseBgColor hook returns the right color", () => {
    // ** render the theme and BgColor hooks
    const theme = renderHook(() => useTheme()).result.current;
    const colors = renderHook(() => UseBgColor()).result.current;

    // checking for errorFilled
    expect(colors["errorFilled"].color).toBe(theme.palette.error.contrastText);
    expect(colors["errorFilled"].backgroundColor).toBe(
      theme.palette.error.main
    );

    // checking for errorLight
    expect(colors["errorLight"].color).toBe(theme.palette.error.main);
    expect(colors["errorLight"].backgroundColor).toBe(
      hexToRGBA(theme.palette.error.main, 0.16)
    );

    // checking for successFilled
    expect(colors["successFilled"].color).toBe(
      theme.palette.success.contrastText
    );
    expect(colors["successFilled"].backgroundColor).toBe(
      theme.palette.success.main
    );

    // checking for successLight
    expect(colors["successLight"].color).toBe(theme.palette.success.main);
    expect(colors["successLight"].backgroundColor).toBe(
      hexToRGBA(theme.palette.success.main, 0.16)
    );

    // checking for warningFilled
    expect(colors["warningFilled"].color).toBe(
      theme.palette.warning.contrastText
    );
    expect(colors["warningFilled"].backgroundColor).toBe(
      theme.palette.warning.main
    );

    // checking for warningLight
    expect(colors["warningLight"].color).toBe(theme.palette.warning.main);
    expect(colors["warningLight"].backgroundColor).toBe(
      hexToRGBA(theme.palette.warning.main, 0.16)
    );

    // checking for infoFilled
    expect(colors["infoFilled"].color).toBe(theme.palette.info.contrastText);
    expect(colors["infoFilled"].backgroundColor).toBe(theme.palette.info.main);

    // checking for infoLight
    expect(colors["infoLight"].color).toBe(theme.palette.info.main);
    expect(colors["infoLight"].backgroundColor).toBe(
      hexToRGBA(theme.palette.info.main, 0.16)
    );

    // checking for primaryFilled
    expect(colors["primaryFilled"].color).toBe(
      theme.palette.primary.contrastText
    );
    expect(colors["primaryFilled"].backgroundColor).toBe(
      theme.palette.primary.main
    );

    // checking for primaryLight
    expect(colors["primaryLight"].color).toBe(theme.palette.primary.main);
    expect(colors["primaryLight"].backgroundColor).toBe(
      hexToRGBA(theme.palette.primary.main, 0.16)
    );

    // checking for secondaryFilled
    expect(colors["secondaryFilled"].color).toBe(
      theme.palette.secondary.contrastText
    );
    expect(colors["secondaryFilled"].backgroundColor).toBe(
      theme.palette.secondary.main
    );

    // checking for secondaryLight
    expect(colors["secondaryLight"].color).toBe(theme.palette.secondary.main);
    expect(colors["secondaryLight"].backgroundColor).toBe(
      hexToRGBA(theme.palette.secondary.main, 0.16)
    );
  });
});
