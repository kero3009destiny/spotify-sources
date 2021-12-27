import React from 'react';
import i18n from 'i18next';

import { Tabs, TabsList, TabsListItem } from '@spotify-internal/adstudio-tape';

import PropTypes from 'prop-types';

export const AssetLibraryModalTabs = ({ activeTab, onClick }) => (
  <Tabs
    list={
      <TabsList>
        <div className="bg-tracks-table-tabs">
          <TabsListItem
            label={i18n.t('I18N_BROWSE_TRACKS', 'Browse tracks')}
            href="#stock-music"
            isActive={activeTab === 'BROWSE_OPTIONS'}
            onClick={e => {
              e.preventDefault();
              onClick('BROWSE_OPTIONS');
            }}
          />

          <TabsListItem
            label={i18n.t('I18N_UPLOAD_TRACK_FILE', 'Upload track file')}
            href="#file-upload"
            isActive={activeTab === 'UPLOAD_BG_AUDIO'}
            onClick={e => {
              e.preventDefault();
              onClick('UPLOAD_BG_AUDIO');
            }}
          />
        </div>
      </TabsList>
    }
  />
);

AssetLibraryModalTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AssetLibraryModalTabs;
