// React Component

import React from "react";

const ActivityContainer = () => {
  return (
    <div className="container mt-4 ">
      <div className="bg-white p-4 rounded shadow border border-warning">
        <h4 className="mb-5">Recent activity across all projects</h4>

        <div className="row ">
          <div className="col-md-3 mb-4">
            <p className="mb-1">23 FEB, 2024</p>
            <p className="mb-1">10:30 AM</p>
          </div>
          <div className="col-md-9">
            <div className="activity-item mb-4">
              <p className="mb-1 fw-bolder">
                Bootstrap Template: Unleashing Creative Possibilities
              </p>
              <p className="mb-1">
                by{" "}
                <span className="text-warning fst-italic">
                  Shantinon Mekalan
                </span>
                <hr className="my-1" />
              </p>
              <p>
                Discover limitless creativity with the Bootstrap template! Our
                latest update offers an array of innovative features and design
                options.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 mb-4">
            <p className="mb-1">23 FEB, 2024</p>
            <p className="mb-1">12:30 AM</p>
          </div>
          <div className="col-md-9">
            <div className="activity-item mb-4">
              <p className="mb-1 fw-bolder">
                Empower Your Digital Presence: The Bootstrap Template Unveiled
              </p>
              <p className="mb-1">
                by <span className="text-warning fst-italic">Bookworm22</span>
                <hr className="my-1" />
              </p>
              <p>
                Unveiling the Bootstrap template, a game-changer for your
                digital presence. With its powerful features and sleek design,
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 mb-4">
            <p className="mb-1">23 FEB, 2024</p>
            <p className="mb-1">2:30 AM</p>
          </div>
          <div className="col-md-9">
            <div className="activity-item mb-4">
              <p className="mb-1 fw-bolder">
                Bootstrap Template: Simplified Design, Maximum Impact
              </p>
              <p className="mb-1">
                by{" "}
                <span className="text-warning fst-italic">Sharuka Nijibum</span>
                <hr className="my-1" />
              </p>
              <p>
                Introducing the Bootstrap template, where simplified design
                meets maximum impact. Elevate your digital presence with its
                sleek and intuitive features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityContainer;
