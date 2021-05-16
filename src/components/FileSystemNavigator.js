import * as React from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { fonts, func, gStyle } from '../constants';

// icons
import SvgCornerLeftUp from '../icons/Svg.CornerLeftUp';
import SvgFolder from '../icons/Svg.Folder';
import SvgHome from '../icons/Svg.Home';
import SvgImage from '../icons/Svg.Image';

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
    const { dirActive, dirRoot } = this.state;

    // console.log('dirRoot', dirRoot);
    const currentDir = `${dirRoot}${dirActive}`;
    // console.log('currentDir', currentDir);

    const docDir = await FileSystem.getInfoAsync(currentDir);

    // console.log('displayDirectory()');
    // console.log('dirArray');
    // console.log(dirArray);
    // console.log('=================');

    // console.log('docDir');
    // console.log(docDir);
    // console.log('=================');

    // does document directory exist?
    if (docDir.exists) {
      // get directory contents
      const dirContents = await FileSystem.readDirectoryAsync(currentDir);
      // console.log('dirContents');
      // console.log(dirContents);
      // console.log('=================');

      const directories = dirContents.filter((d) => d.includes('.') === false);
      const files = dirContents.filter((f) => f.includes('.') === true);
      const newContentsSorted = directories.sort().concat(files.sort());

      // console.log('directories', directories.sort());
      // console.log('files', files.sort());
      // console.log('=================');
      // console.log('newContentsSorted', newContentsSorted);
      // console.log('=================');

      // const returnedData = await Promise.all(
      //   Object.keys(docDirContents).map(async (item) => {
      // const directory = docDirContents[item];
      // console.log('item', item);
      // console.log('directory', directory);
      // const dirFullPath = `${currentDir}${directory}`;
      // const dirInfo = await FileSystem.getInfoAsync(dirFullPath);
      // const dirContents = await FileSystem.readDirectoryAsync(dirFullPath);
      // console.log('dirInfo', dirInfo);
      // console.log('currentDir', currentDir);
      // console.log('dirFullPath', dirFullPath);
      // console.log('size', func.bytesToSize(dirInfo.size));
      // const timestamp = dirInfo.modificationTime;
      // const date = new Date(timestamp * 1000);
      // const iso = date
      //   .toISOString()
      //   .match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/);
      // console.log('iso', iso);

      // const utcSeconds = dirInfo.modificationTime;
      // const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
      // d.setUTCSeconds(utcSeconds);
      // console.log('d', d);

      // console.log('dirContents', dirContents);
      // console.log('==================');
      // console.log('==================');
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
      // return false;
      //   })
      // );

      this.setState({
        dirContents: newContentsSorted
      });
    }
  }

  async createDirectory() {
    const { dirActive, dirRoot, textFormatted } = this.state;

    const newDirectoryPath = `${dirRoot}${dirActive}/${textFormatted}`;

    // console.log('textFormatted', textFormatted);
    // console.log('newDirectoryPath', newDirectoryPath);
    // console.log('=================');

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
      dirRoot,
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
              {`${dirActive}/${textFormatted}/`}
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
                dirArray.pop();

                const newActiveDir = dirArray.join('/');

                this.setState(
                  { dirActive: newActiveDir, dirArray },
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

          <ScrollView
            contentContainerStyle={styles.containerDirectory}
            showsVerticalScrollIndicator={false}
          >
            {dirContents &&
              dirContents.map((item, index) => {
                // console.log('item', item);
                // console.log('---------------------');
                const isFile = item.includes('.');
                const isImage = /\.(gif|jpe?g|png|webp|bmp)$/i.test(item);
                const pathToFile = `${dirRoot}${dirActive}${item}`;

                return (
                  <TouchableOpacity
                    activeOpacity={gStyle.activeOpacity}
                    key={index.toString()}
                    onPress={() => {
                      dirArray.push(item);

                      const newActiveDir = dirArray.join('/');

                      this.setState(
                        { dirActive: newActiveDir, dirArray },
                        this.displayDirectory
                      );
                    }}
                    style={styles.lineItem}
                  >
                    <View style={gStyle.flexRowAlignCenter}>
                      {isFile ? (
                        <SvgImage size={18} />
                      ) : (
                        <SvgFolder size={18} />
                      )}
                      <Text style={styles.lineItemText}>{item}</Text>
                    </View>

                    {isImage && (
                      <Image
                        source={{ uri: pathToFile }}
                        style={styles.imagePreview}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>

        <Button
          onPress={async () => {
            console.log('downloaded');

            const response = await FileSystem.downloadAsync(
              'https://calebnance.com/images/caleb-nance.jpg',
              `${FileSystem.documentDirectory}caleb-nance.jpg`
            );
            console.log('response');
            console.log(response);
            console.log('==============');
            this.displayDirectory();
          }}
          title="Download File"
        />
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
    height: 480,
    padding: 8
  },
  containerHeader: {
    ...gStyle.flexRowAlignCenter,
    backgroundColor: '#999999',
    borderRadius: 4
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
    // backgroundColor: '#909090'
  },
  lineItem: {
    ...gStyle.flexRowSpace,
    ...gStyle.mT1,
    ...gStyle.pH1,
    backgroundColor: '#0d1117',
    borderRadius: 4,
    height: 64
  },
  lineItemText: {
    ...gStyle.mL1,
    color: '#ffffff',
    fontFamily: fonts.sourceCodeProReg
  },
  imagePreview: {
    borderRadius: 8,
    height: 48,
    width: 48
  }
});

export default FileSystemNavigator;
