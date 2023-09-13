import React from "react";

export default function InfoTooltip ({isOpen, onClose, text}) {
  return(
    <section className={`infoTooltip ${
      isOpen ? "infoTooltip_opened" : ""
    }`}>
      <div className="infoTooltip__container">
        <button
          className="infoTooltip__close"
          type="button"
          onClick={onClose} />
          <h2 className="infoTooltip__title">{text}</h2>
      </div>
    </section>
  );
};