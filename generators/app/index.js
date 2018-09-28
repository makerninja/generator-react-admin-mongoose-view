'use strict';
const SchemaReader = require('./schema-reader');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument('modelPath', { type: String, required: true });

    // And you can then access it later; e.g.
    this.log(this.options.modelPath);
    this.schema = new SchemaReader(this.options.modelPath);
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the swell ${chalk.red(
          'generator-react-admin-mongoose-view'
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'ressourceName',
        message: 'Your view name',
        // Defaults to the project's folder name if the input is skipped
        // default: this.appname
        default: this.schema.getRessourceName()
      },
      {
        type: 'confirm',
        name: 'generateListView',
        message: 'Would you like to generate List view ?',
        default: true
      },
      {
        type: 'confirm',
        name: 'generateEditView',
        message: 'Would you like to generate Edit view ?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      // this.log(props);
      this.props = props;
    });
  }

  writing() {
    const ressourceName = this.props.ressourceName;
    const schemaFields = this.schema.getPaths();
    const context = {
      ressourceName: ressourceName,
      fields: schemaFields,
      props: this.props
    };

    // Index
    this.fs.copyTpl(
      this.templatePath('ressource/index.ejs'),
      this.destinationPath('src/' + ressourceName + '/index.js'),
      context
    );

    // List Views
    if (this.props.generateListView) {
      this.fs.copyTpl(
        this.templatePath('ressource/ressourceList.ejs'),
        this.destinationPath('src/' + ressourceName + '/' + ressourceName + 'List.js'),
        context
      );
    }
    // Edit Views
    if (this.props.generateEditView) {
      this.fs.copyTpl(
        this.templatePath('ressource/ressourceEdit.ejs'),
        this.destinationPath('src/' + ressourceName + '/' + ressourceName + 'Edit.js'),
        context
      );
    }
  }

  install() {
    this.installDependencies();
  }
};
