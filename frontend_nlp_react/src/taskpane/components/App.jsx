import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { EditArrowBack24Regular, DocumentOnePageMultiple24Regular } from '@fluentui/react-icons';
import { Input } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const globalStyles = {
  color: '#707070',
  fontSize: 14,
  fontFamily: 'Segoe UI, sans-serif',
  fontWeight: 400,
  lineHeight: 20,
  wordWrap: 'break-word',
};

const App = (props) => {
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const listItems = [
    {
      icon: <Ribbon24Regular />,
      primaryText: "Achieve more with Office integration",
    },
    {
      icon: <LockOpen24Regular />,
      primaryText: "Unlock features and functionality",
    },
    {
      icon: <DesignIdeas24Regular />,
      primaryText: "Create and visualize like a pro",
    },
  ];

  return (
    <div style={{globalStyles, width: '100%', height: '100%', background: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'inline-flex'}}>
      {/* Search Bar */}
      <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'inline-flex' }}>
        <div style={{ alignSelf: 'stretch', height: 32, borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex' }}>
          <div style={{ alignSelf: 'stretch', paddingLeft: 10, paddingRight: 10, background: 'rgba(255, 255, 255, 0)', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
            <div style={{ flex: '1 1 0', height: 32, justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
              <Input appearance="underline" style={{flex: '1 1 0', height: 32, paddingTop: 5, paddingBottom: 7, paddingLeft: 2, paddingRight: 2, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex', color: '#707070', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '400', wordWrap: 'break-word' }} placeholder="This is a placeholder" />
            </div>
          </div>
          <div style={{ width: 321, height: 1, background: '#575757' }} />
        </div>
      </div>
      {/* Summary */}
      <div style={{alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{paddingLeft: 7, paddingRight: 7, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'inline-flex'}}>
              <div style={{alignSelf: 'stretch', color: 'black', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '600', wordWrap: 'break-word'}}>
                Lorem ipsum 
              </div>
          </div>
          <div style={{paddingLeft: 14, paddingRight: 14, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 11, display: 'flex'}}>
              <button  style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                <EditArrowBack24Regular style={{width: 16, height: 16, position: 'relative'}}> </EditArrowBack24Regular>
              </button>
              <button  style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                <DocumentOnePageMultiple24Regular style={{width: 16, height: 16, position: 'relative'}}> </DocumentOnePageMultiple24Regular>
              </button>
          </div>
      </div>
      <div style={{height: 120, paddingLeft: 7, paddingRight: 7, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', color: 'black', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '400', wordWrap: 'break-word'}}>dolor sit amet consectetur. Eu sagittis tempor lacus id. Tortor felis pellentesque elementum nunc pellentesque. Lorem dolor dictum habitant aliquam. Fermentum non praesent feugiat mollis <br/><br/></div>
      </div>
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
