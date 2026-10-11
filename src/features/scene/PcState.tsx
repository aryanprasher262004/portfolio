import type { CSSProperties } from "react";
import {
  FAN_RINGS,
  fanStyle,
  rectStyle,
  FRONT_PANEL_RECT,
  GLASS_PANEL_POLY,
  PC_RECT,
  POWER_LED_RECT,
  towerPolygon,
} from "./sceneConfig";
import styles from "./PcState.module.css";

const towerStyle = rectStyle(PC_RECT);
const ledStyle = rectStyle(POWER_LED_RECT);
const frontStyle = rectStyle(FRONT_PANEL_RECT);
const fanStyles = FAN_RINGS.map(fanStyle);
const glassStyle: CSSProperties = {
  ...towerStyle,
  clipPath: towerPolygon(GLASS_PANEL_POLY),
};

/**
 * The PC tower's physical light layers over the plate (which is already
 * correctly dark when off). CSS owns the steady on/off states via
 * `data-powered`; the power-on choreography (`usePowerSequence`, DEC-019)
 * animates the transition between them through the `data-fx` hooks.
 */
export function PcState({ powered }: { powered: boolean }) {
  return (
    <div className={styles.pc} data-powered={powered} aria-hidden>
      <div className={styles.spill} style={towerStyle} data-fx="spill" />
      <div className={styles.interior} style={glassStyle} data-fx="interior" />
      <div className={styles.front} style={frontStyle} data-fx="front" />
      {fanStyles.map((style, i) => (
        <div key={i} className={styles.fan} style={style} data-fx="fan">
          <div className={styles.fanLayer} data-fan-jolt>
            <div className={styles.fanLayer} data-fan-spin>
              <div className={styles.blades} data-fan-blades />
              <div className={styles.blur} data-fan-blur />
            </div>
          </div>
        </div>
      ))}
      <div className={styles.press} style={ledStyle} data-fx="press" />
      <div className={styles.ledTint} style={ledStyle} data-fx="led" />
      <div className={styles.ledHalo} style={ledStyle} data-fx="led" />
    </div>
  );
}
