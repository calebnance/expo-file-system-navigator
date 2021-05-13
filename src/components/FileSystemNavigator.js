import * as React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { fonts, gStyle } from '../constants';

// icons
import SvgCornerLeftUp from '../icons/Svg.CornerLeftUp';
import SvgFolder from '../icons/Svg.Folder';
import SvgHome from '../icons/Svg.Home';

class FileSystemNavigator extends React.Component {
  constructor() {
    super();

    this.state = {
      dirActive: '',
      dirArray: [],
      dirContents: null,
      dirRoot: FileSystem.documentDirectory,
      text: null,
      textFormatted: null
    };

    this.onChangeDirText = this.onChangeDirText.bind(this);
    this.createDirectory = this.createDirectory.bind(this);
  }

  componentDidMount() {
    // console.log('componentDidMount');
    // console.log('=================');
    // get initial state
    this.displayDirectory();
  }

  onChangeDirText(text) {
    const letterAndSpaceRegex = /^[A-Za-z ]+$/;
    // if nothing or spaces, set to null
    if (text.length === 0 || text === ' ') {
      this.setState({
        text: null,
        textFormatted: null
      });
    } else if (letterAndSpaceRegex.test(text)) {
      const newText = text.trimStart().toLowerCase();
      const newTextFormatted = newText.replaceAll(' ', '-').trim();

      this.setState({
        text: newText,
        textFormatted: newTextFormatted
      });
    }
  }

  async displayDirectory() {
    const { dirActive, dirArray, dirRoot } = this.state;

    // console.log('dirRoot', dirRoot);
    const currentDir = `${dirRoot}${dirActive}`;
    console.log('currentDir', currentDir);

    const docDir = await FileSystem.getInfoAsync(currentDir);

    console.log('displayDirectory()');
    console.log('dirArray');
    console.log(dirArray);
    console.log('=================');

    // console.log('docDir');
    // console.log(docDir);
    // console.log('=================');

    // does document directory exist?
    if (docDir.exists) {
      // get directory contents
      const docDirContents = await FileSystem.readDirectoryAsync(currentDir);
      // console.log('docDirContents');
      // console.log(docDirContents);
      // console.log('=================');

      // const returnedData = await Promise.all(
      //   Object.keys(docDirContents).map(async (item) => {
      // const directory = docDirContents[item];
      // const dirFullPath = `${currentDirectory}${directory}`;
      // const dirInfo = await FileSystem.getInfoAsync(dirFullPath);
      // const dirContents = await FileSystem.readDirectoryAsync(dirFullPath);
      // console.log('dirInfo', dirInfo);
      // console.log('dirContents', dirContents);
      // console.log('==================');
      // const videoObj = videosObj[key];
      // const video = await Asset.fromModule(
      //   videosObj[key].video
      // ).downloadAsync();
      // const { uri } = await VideoThumbnails.getThumbnailAsync(video.uri, {
      //   time: 2000
      // });
      //
      // return {
      //   ...videoObj,
      //   name: key,
      //   uri
      // };
      //   })
      // );

      this.setState({
        dirContents: docDirContents.sort()
      });
    }
  }

  async createDirectory() {
    const { dirActive, dirRoot, textFormatted } = this.state;

    const newDirectoryPath = `${dirRoot}${dirActive}/${textFormatted}`;

    console.log('textFormatted', textFormatted);
    console.log('newDirectoryPath', newDirectoryPath);
    console.log('=================');

    const response = await FileSystem.makeDirectoryAsync(newDirectoryPath);
    console.log('response', response);
    console.log('=================');

    this.setState(
      {
        text: null,
        textFormatted: null
      },
      this.displayDirectory
    );
  }

  render() {
    const {
      dirActive,
      dirArray,
      dirContents,
      text,
      textFormatted
    } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={this.onChangeDirText}
          onBlur={() => {
            if (textFormatted !== null) {
              const lastIndexOf = textFormatted.lastIndexOf('-') + 1;
              const textLength = textFormatted.length;

              // remove trailing dash once finished
              if (lastIndexOf === textLength) {
                this.setState({
                  textFormatted: textFormatted.slice(0, -1)
                });
              }
            }
          }}
          style={styles.input}
          value={text}
        />

        {text && (
          <View style={styles.containerCreateDirectoryPreview}>
            <Text>Will create:</Text>
            <Text style={styles.textFormatted}>
              {`/${dirActive}/${textFormatted}/`}
            </Text>
          </View>
        )}

        {text && (
          <Button onPress={this.createDirectory} title="Create Directory" />
        )}

        <View style={gStyle.spacer2} />

        <View style={styles.containerScrollView}>
          <View style={styles.containerHeader}>
            <TouchableOpacity
              activeOpacity={gStyle.activeOpacity}
              hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              onPress={() => {
                console.log('onPress::Home');
                console.log('dirArray', dirArray);
                console.log('dirActive', dirActive);
                console.log('============');
                dirArray.pop();
                console.log('dirArray', dirArray);
                console.log('============');
                this.setState(
                  { dirActive: '', dirArray },
                  this.displayDirectory
                );
              }}
              style={styles.headerIcon}
            >
              {dirActive === '' ? (
                <SvgHome fill="#ffffff" size={18} />
              ) : (
                <SvgCornerLeftUp fill="#ffffff" size={18} />
              )}
            </TouchableOpacity>

            <View style={styles.headerPath}>
              <Text style={styles.currentText}>Current path:</Text>
              <Text style={styles.pathText}>{`/${dirActive}`}</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.containerDirectory}>
            {dirContents &&
              dirContents.map((item, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={gStyle.activeOpacity}
                    key={index.toString()}
                    onPress={() => {
                      dirArray.push(item);

                      console.log('dirArray', dirArray);
                      // console.log('newDirArray', newDirArray);
                      console.log('=================');

                      this.setState(
                        { dirActive: item, dirArray },
                        this.displayDirectory
                      );
                    }}
                    style={styles.lineItem}
                  >
                    <SvgFolder size={18} />
                    <Text style={styles.lineItemText}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    ...gStyle.mH2,
    ...gStyle.mT2,
    ...gStyle.pH1,
    borderColor: '#000000',
    borderWidth: 1,
    height: 40
  },
  containerCreateDirectoryPreview: {
    ...gStyle.flexRowAlignCenter,
    ...gStyle.mH2,
    ...gStyle.mT2
  },
  textFormatted: {
    ...gStyle.mLHalf,
    backgroundColor: '#999999',
    paddingHorizontal: 4,
    paddingVertical: 2
  },
  containerScrollView: {
    ...gStyle.mH2,
    backgroundColor: '#393e46',
    borderRadius: 8,
    height: 300,
    padding: 8
  },
  containerHeader: {
    ...gStyle.flexRowAlignCenter,
    ...gStyle.mB2,
    backgroundColor: '#999999'
  },
  headerIcon: {
    ...gStyle.mH1
  },
  headerPath: {
    ...gStyle.mV1
  },
  currentText: {
    fontSize: 12
  },
  pathText: {
    fontSize: 12
  },
  containerDirectory: {
    backgroundColor: '#909090'
  },
  lineItem: {
    ...gStyle.flexRowAlignCenter,
    ...gStyle.mB1,
    ...gStyle.pH1,
    backgroundColor: '#0d1117',
    borderRadius: 4,
    height: 48
  },
  lineItemText: {
    ...gStyle.mL1,
    color: '#ffffff',
    fontFamily: fonts.sourceCodeProReg
  }
});

export default FileSystemNavigator;
