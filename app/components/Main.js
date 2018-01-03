import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView ,
} from 'react-native';
import Note from './Note';


export default class Main extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      noteArray: [],
      noteText: '',
    }
  }

  render() {
    let notes= this.state.noteArray.map((val, key) => {
      return <Note key={key} keyVal={key} val={val}
              deleteMethod={ () => this.deleteNote(key) } />
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>NOTER</Text>
        </View>

        <ScrollView style={styles.scrollCOntainer}>
          {notes}
        </ScrollView>

        <KeyboardAvoidingView style={styles.footer} behavior="padding">
          <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            onChangeText={(noteText) => this.setState({noteText})}
            value={this.state.noteText}
            placeholder='noted'
            placeholderTextColor='white'
            underlineCOlorAndroid='transparent'>
          </TextInput>
        </KeyboardAvoidingView>


      </View>
    );
  }

  addNote() {
    const { noteText, noteArray } = this.state;

    if(this.state.noteArray.every((item) => item.note !== noteText)){
        let d = new Date();
        if(noteText === ''){
          alert('noted must be filled');
        } else {
          this.state.noteArray.push({
            'date': d.getFullYear() +
            "/" + (d.getMonth() + 1) +
            "/" + d.getDate(),
            'note': noteText
          });

          this.setState({
            noteArray: noteArray,
            noteText: ''
          });
        }
     } else {
       alert('data udah ada');
     }
  }

  deleteNote(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({noteArray: this.state.noteArray});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#f4b841',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 20,
  },
  scrollCOntainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth:2,
    borderTopColor: '#ededed',
  },
  addButton: {
    position: 'relative',
    alignSelf: 'flex-end',
    backgroundColor: '#f4b841',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});
