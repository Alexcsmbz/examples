import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';

export const faqInstructions = [
  {
    id: '1',
    title: 'How can I connect to the service?',
    opened: false,
    data: (
      <PBox display="grid" gap="20px">
        <PTypo>
          To access and operate on Stars.Art, you will need a crypto wallet, such as{' '}
          <a target="_blank" href="https://metamask.io/" rel="noreferrer">
            MetaMask
          </a>{' '}
          or{' '}
          <a target="_blank" href="https://trustwallet.com/" rel="noreferrer">
            Trust Wallet
          </a>
          .
        </PTypo>
        <PTypo>
          As Stars.Art just provides a system for peer-to-peer exchanges and never takes possession of selling items,
          you’ll need a wallet to turn your actions in the browser into transactions on the blockchain. Crypto wallet
          helps you conduct asset trading without the use of an intermediary, such as a bank. It allows you to store and
          retrieve your tokens and to interact with a blockchain network.
        </PTypo>
        <PTypo>
          Installing a crypto wallet on your PC or mobile and creating an account isn’t enough, as you’ll have to
          connect it to your Stars.Art account too. Let's walk through the process of setting up.
        </PTypo>
        <PTypo>
          Go to the Stars.Art website and click on the <b>Connect wallet</b> button on the top right. A popup window
          will appear which will ask to choose from 2 options.
        </PTypo>
        <PTypo>
          If you have installed MetaMask on your PC, click on the <b>MetaMask</b> icon displayed in the pop-up window,
          and you will then be prompted to connect your wallet. Once the wallet is logged in, it will show <b>Sign</b>,
          then click this button. After it is done, you can now edit your profile by adding username, bio, profile
          photo, and social media links.
        </PTypo>
        <PTypo>
          If you have installed MetaMask on your mobile device, click on the <b>WalletConnect</b> icon within pop-up. QR
          code will be displayed in a new popup window. Now you need to scan the code with the crypto wallet app you are
          using to connect it to the platform. Open MetaMask app, click on <b>Sync & import</b>, then{' '}
          <b>Scan QR code</b>.
        </PTypo>
        <PTypo>
          On the Trust Wallet app, go to <b>Settings</b> (Gear icon). On the settings screen, select{' '}
          <b>WalletConnect</b>. This opens the camera to scan the QR code. After scanning, it should prompt you to
          approve the connection to Stars.Art.
        </PTypo>
        <PTypo>
          Signing up for Stars.Art is done by connecting your crypto wallet to the website. Note that there is no
          transaction gas fee to set up an account.
        </PTypo>
        <PTypo>
          Once the wallet is logged in, you can now personalize your profile by adding username, bio, profile photo, and
          social media links.
        </PTypo>
      </PBox>
    ),
  },
  {
    id: '2',
    title: 'How do I create an NFT?',
    opened: false,
    data: (
      <PBox display="grid" gap="20px">
        <PTypo>Creating an NFT on Stars.Art is fairly straightforward!</PTypo>
        <PTypo>Here’s how the process works.</PTypo>
        <PTypo>
          From{' '}
          <a target="_blank" href={window.location.origin} rel="noreferrer">
            Stars.art
          </a>
          , simply click the <b>Create item</b> button in the upper right corner. You will then be prompted to select
          blockchain. For now Stars.Art uses just <b>Ethereum</b>, that's why only one button is selectable. But we keep
          optimizing the customer journey by making upgrades and improvements. In the near future the platform will be
          adding support for the <b>Solana</b> and <b>Klaytn</b> ecosystems.
        </PTypo>
        <PTypo>
          After selecting the blockchain you will then be prompted to choose a token standard. Stars.Art is designed to
          sell both single pieces of art and collections and therefore enforces two token standards - ERC-721 &
          ERC-1155. Let's look at the difference between them. ERC-721 requires a separate contract to be deployed for
          each token type or collection. ERC-1155 is the Multi-token standard which works for all types of assets -
          fungible and non-fungible. It removes the need to “approve” individual token contracts separately and allows
          to transfer multiple token types at once, saving on transaction costs.
        </PTypo>
        <PTypo>
          Please note that the initial launch supports ERC-1155 standard in reduced functionality mode with multiple
          token types support planned soon after.
        </PTypo>
        <PTypo>
          Clicking the <b>ERC-721</b> button will take you to the <b>Create item</b> page that will allow you to upload
          your artwork(s), add a name and include a description.
        </PTypo>
        <PTypo>
          Stars.Art covers 10 types of NFTs - art, music, photography, games, trading cards, sports, virtual worlds,
          explicit content, memes, punk collectibles. Be sure to indicate which category your item will be associated
          with. Select the appropriate category from the drop down list.
        </PTypo>
        <PTypo>
          After completing those fields, don’t forget to choose the royalty percentage so you could earn a commission
          every time the asset is sold to a new person. You can set a percentage up to 15%.
        </PTypo>
        <PTypo>
          Once you’re finished, click <b>Create item</b> at the bottom. Congrats, you've just made your first NFT!
        </PTypo>
      </PBox>
    ),
  },
  {
    id: '3',
    title: 'My Collections',
    opened: false,
    data: (
      <PBox display="grid" gap="20px">
        <PTypo>
          Stars.Art lets you create and sell an NFT as a Single item without a collection. But if you want to create a
          series of NFTs, it will be easier to manage your digital assets by grouping them into collections. Collections
          let you gather related items into an easy to access list. The collections that you are the owner of appear
          under the <b>My Collections</b> tab.
        </PTypo>
        <PTypo>
          <b>My Collections</b> section stores all your NFTs without making a distinction between those that were
          created by you and those that were purchased by you on Stars.Art or other marketplaces. Your Stars.Art account
          provides access to view the transactions in your crypto wallet, so that you could add purchased NFTs to the{' '}
          <b>My collections</b> section and put them up for sale.
        </PTypo>
        <PTypo>
          You can create multiple collections on Stars.Art as well as collections with a single or multiple items.
          Please note that a collection with a single item can be easily converted to a collection for multiple items
          just by uploading new files. You can also move items from one collection to another, or permanently remove
          them. The same applies to collections - for one reason or another, you might want to delete your collection
          after a while. Please take into account that deleting a collection does not remove items - these files will be
          transferred from the deleted collection to an unsorted catalog.
        </PTypo>
        <PTypo>
          <b>Stars.Art provides two methods for organizing your assets:</b>
        </PTypo>
        <PBox>
          <PTypo>
            <b>- Collections folders</b> which are pinned to the top of the library. Assets are saved in a specific
            collection. Deleting a collection or removing an asset from the collection just takes it out of that
            grouping. The asset remains in your account and simply gets transferred to an unsorted catalog. You can also
            select one or multiple assets from a folder and move them to an existing or new folder. Additionally, keep
            in mind that renaming a collection does not impact the assets in it.
          </PTypo>
          <PTypo>
            <b>- Unsorted catalog</b> which lists single items without collections, these files are displayed just below
            collections folders.
          </PTypo>
        </PBox>
        <PTypo>To add items to a collection, you first need to create one. Now, let’s finally get started.</PTypo>
        <PTypo>
          1. Click on <b>My Collections</b>, and it will take you to a page with all of your collections. If you don’t
          have any collections created, then this page will be empty.
        </PTypo>
        <PTypo>
          2. Once you've clicked on the <b>Create a collection</b> button displayed in the left sidebar, you'll see a
          popup asking you to enter a name for your collection. When you're done, click <b>Save</b>. This adds a
          collection folder to the list.
        </PTypo>
        <PTypo>That’s it. You’ve now created your first NFT collection. Congrats!</PTypo>
        <PTypo>
          You can rename or delete your collection at any time - just click the three dots icon in the upper-right
          corner of a collection folder, and then select <b>Edit</b> or <b>Delete</b>.
        </PTypo>
        <PTypo>
          Double click on a collection folder opens the collection homepage. Navigate to it to add new assets. You can
          edit and transfer your items, as well as share them on social media. To do this, click the three dots icon in
          the upper-right corner of an item card and open a dropdown menu that offers a list of options.
        </PTypo>
      </PBox>
    ),
  },
  {
    id: '4',
    title: 'How do I sell an NFT?',
    opened: false,
    data: (
      <PBox display="grid" gap="20px">
        <PTypo>Ready to sell your NFTs? Let's get into it! Here are some tips to help you perform well.</PTypo>
        <PTypo>Select the NFT you would like to sell.</PTypo>
        <PTypo>
          NFTs that you are the owner of appear under the <b>My Collections</b> tab. This section stores all your NFTs
          without making a distinction between those that were created by you and those that were purchased by you on
          Stars.Art or other marketplaces. Your Stars.Art account provides access to view the transactions in your
          crypto wallet, so that you could add purchased NFTs to the <b>My collections</b> section and put them up for
          sale. Just be sure to indicate which category your item will be associated with. Select the appropriate
          category from the drop down list.
        </PTypo>
        <PTypo>
          Whether you are selling an NFT you created or one in your collection, the process is similar and
          straightforward.
        </PTypo>
        <PTypo>
          Clicking the three dots icon in the upper-right corner of an item card prompts you to open a dropdown menu
          that offers a list of options. Select "Put on sale" and define the conditions of the sale - set a price for
          your NFT as well as listing duration.
        </PTypo>
        <PTypo>Don’t forget to share your listing on social media!</PTypo>
        <PTypo>
          To cancel listing click again on the three dots icon at the top-right of an item card and choose{' '}
          <b>Remove From Sale</b> from the drop-down menu. Then confirm your changes.
        </PTypo>
        <PTypo>NOTE that an NFT holder pays the gas fee when canceling listing.</PTypo>
      </PBox>
    ),
  },
  {
    id: '5',
    title: 'How do I change the price of an item?',
    opened: false,
    data: (
      <PBox display="grid" gap="20px">
        <PTypo>
          You may need to change the price of an item you list on Stars.Art to be sure you're making as much money as
          you should. Stars.Art doesn't place any restrictions on price changes.
        </PTypo>
        <PTypo>NOTE that an NFT holder pays the gas fee when editing the price.</PTypo>
        <PTypo>
          Select the listing you'd like to change, and click on the three dots icon at the top-right of an item card.
          Next choose <b>Edit</b> from the drop-down menu and enter a new price. Then confirm your changes. And that's
          it! The price is now updated.
        </PTypo>
      </PBox>
    ),
  },
  {
    id: '6',
    title: 'How do I transfer an NFT to another crypto wallet?',
    opened: false,
    data: (
      <PBox display="grid" gap="20px">
        <PTypo>
          Important: You can only transfer minted but not yet listed NFTs that haven't been put up for sale. Please also
          make sure you have enough ETH to cover the gas fee for the transfer.
        </PTypo>
        <PTypo>To transfer your NFT to another wallet, follow these simple steps:</PTypo>
        <PTypo>
          Find the NFT you wish to transfer and click on the three dots icon at the top-right of an item card. Next
          choose <b>Transfer</b> from the drop-down menu. Enter the wallet address (must be an Ethereum (ERC) wallet, so
          is yours) and hit <b>Transfer</b>. You will now be asked to confirm the transaction in your wallet. Once it’s
          done, your NFT will be transferred to another crypto wallet.
        </PTypo>
      </PBox>
    ),
  },
  {
    id: '7',
    title: 'Where are my NFTs stored?',
    opened: false,
    data: (
      <PBox display="grid" gap="20px">
        <PTypo>
          <b>My Collections</b> section stores all your NFTs without making a distinction between those that were
          created by you and those that were purchased by you on Stars.Art or other marketplaces.
        </PTypo>
        <PTypo>
          <b>Stars.Art provides two methods for organizing your assets: </b>
        </PTypo>
        <PBox>
          <PTypo>
            <b>- Collections folders</b> which are pinned to the top of the library. Assets are saved in a specific
            collection. Deleting a collection or removing an asset from the collection just takes it out of that
            grouping. The asset remains in your account and simply gets transferred to an unsorted catalog. You can also
            select one or multiple assets from a folder and move them to an existing or new folder. Additionally, keep
            in mind that renaming a collection does not impact the assets in it.
          </PTypo>
          <PTypo>
            <b> - Unsorted catalog</b> which lists single items without collections, these files are displayed just
            below collections folders.
          </PTypo>
        </PBox>
      </PBox>
    ),
  },
  {
    id: '8',
    title: 'My favorites',
    opened: false,
    data: (
      <PBox display="grid" gap="20px">
        <PTypo>You can track and stay up to date with your favorite NFTs.</PTypo>
        <PTypo>
          Likes also raise NFTs in the ranking position and increase their visibility among the buying visitors.
        </PTypo>
        <PTypo>
          To add an NFT to “My Favorites”, click the heart icon in the bottom-right corner of an item card and keep
          track of it via the "My Favorites" tab.
        </PTypo>
        <PTypo>
          Click on "My Favorites", and it will take you to a page with all of your favorite NFTs. If you don’t have any
          favorite NFTs, then this page will be empty.
        </PTypo>
        <PTypo>
          You can remove items from "My Favorites" at any time. Tap "My Favorites" to view the list of your favorite
          NFTs. Press on the item you want to remove. Click the heart icon in the bottom-right corner of an item card to
          unfavorite.
        </PTypo>
      </PBox>
    ),
  },
  {
    id: '9',
    title: 'My History',
    opened: false,
    data: (
      <PBox display="grid" gap="20px">
        <PTypo>
          My History section displays all your transactions providing access to anything recorded on-chain, including:
        </PTypo>
        <PBox>
          <PTypo>- your purchased and sold-out items,</PTypo>
          <PTypo>- trade dates,</PTypo>
          <PTypo>- order prices,</PTypo>
          <PTypo>- function callers and recipients addresses,</PTypo>
          <PTypo>- transaction IDs with links to a crypto scanner.</PTypo>
        </PBox>
        <PTypo>
          Your transaction history view shows up as a table on screen. Complex transactional data is turned into
          something that can be easily read. So you can easily keep on top of your personal income and expenses.
        </PTypo>
      </PBox>
    ),
  },
  {
    id: '10',
    title: 'Who pays fees when using Ethereum on Stars.Art?',
    opened: false,
    data: (
      <PBox display="grid" gap="20px">
        <PTypo>
          1. Service fees. The platform's service fees apply to all sales volume. The platform takes 0.75% of the deal
          when buying takes up an order. Service fees are paid by the seller of the NFT who receives sales price minus
          fees.
        </PTypo>
        <PBox>
          <PTypo>
            2. Gas fees. Who pays the gas fees depends on the transaction. An <b>NFT holder</b> pays the gas fee when
            minting an item, transferring it to another crypto wallet, canceling listing and editing the price.
          </PTypo>
          <PTypo>
            A <b>buyer</b> pays the gas fee when purchasing an item.
          </PTypo>
        </PBox>
        <PTypo>
          3. Royalty fees (royalties). NFT creators can earn a commission every time the asset is sold to a new person.
          The royalty percentage is set by the creators themselves but can't exceed 15%. This 15% cap makes sense
          because too high royalties can easily stifle trading activity. To set your secondary sale fee, simply start
          setting up the minting process and adjust the "Percentage fee" field under the Royalty section. The royalties
          are paid by the seller of an NFT on secondary sales.
        </PTypo>
      </PBox>
    ),
  },
  {
    id: '11',
    title: 'NFT-royalties',
    opened: false,
    data: (
      <PBox display="grid" gap="20px">
        <PTypo>
          Digital artists can benefit from NFTs even after they have sold their assets. Automatic payouts made to
          authors on secondary sales are called NFT royalties. Let's dive in and learn how they work.
        </PTypo>
        <PTypo>
          Art would not exist without artists. To encourage them to continue their work and provide a fairer reward, NFT
          developers have built into the code of a “smart contract” a method of pushing a portion of the resale proceeds
          back to the original author. Each time a secondary sale happens, the smart contract ensures that the terms of
          the NFT are fulfilled. Unlike traditional royalty payments, NFT royalties are perpetual and executed
          automatically. Being fully customized, NFT royalties are usually set by the asset owner during the minting
          process.
        </PTypo>
        <PTypo>
          To set a secondary sale fee on Stars.Art, simply start setting up the minting process and adjust the
          "Percentage fee" field under the Royalty section. Stars.Art lets you set a percentage up to 15%.
        </PTypo>
      </PBox>
    ),
  },
];
