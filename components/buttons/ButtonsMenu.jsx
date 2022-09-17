import { FlowButton } from "./FlowButton";
import { SaveButton } from "./SaveButton";

export const ButtonsMenu = () => {
  return (
    <div className="app-button-container">
      <FlowButton />
      <SaveButton />
      {/* TODO add future features below */}
      {/*<FocusPopup />*/}
    </div>
  )
}
