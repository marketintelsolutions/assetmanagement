import { Box, Modal } from "@mui/material";
import React from "react";
import { style } from "./config";

const NdprModal = ({ modal }) => {
  return (
    <Modal
      open={modal.isOpen}
      onClose={modal.close}
      aria-labelledby="card-modal"
      aria-describedby="card-summary-modal"
      className="backdrop-blur-[3px] z-[9999]"
    >
      <Box
        sx={style}
        className="bg-primaryBlue items-center justify-center max-h-[90%] overflow-y-scroll py-[37px] px-[48px] relative rounded-[20px] border border-[#F0F0F3] w-[50%] max-w-[650px] bg-white p-6 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.08)]"
      >
        <div className="w-full h-[600px]">
          <iframe
            src="/pdf/ndpr.pdf"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="NDPR Document"
          />
        </div>
        {/* Close button */}
        <button
          onClick={modal.close}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          aria-label="Close modal"
        >
          x
        </button>
      </Box>
    </Modal>
  );
};

export default NdprModal;
