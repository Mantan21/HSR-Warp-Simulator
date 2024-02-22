# Guide to Add new Locale

1. To add a language, just duplicate `en-US.json`, rename to your locale then edit it, change everythings that need to change.
2. Some languages keep character and weapon names in English, if the language you want to add has its own name for the characters/weapons you can localize it by duplicating the `en-US.json` file from the `items` folders too.
3. Then open `/src/lib/data/country.json`, insert the Locale Name and Flag here. You can take the base46 flag from this gist [https://gist.github.com/CodeTheInternet/9312404](https://gist.githubusercontent.com/CodeTheInternet/9312404/raw/4987ca07c4032bb6262a65794f428b350e1d86a1/gistfile1.json)
4. Last Step, navigate to `/src/lib/helpers/i18n.js`. Insert the new locale into `supportedLocales` array, if you have localized characters/weapons too, insert the new locale name to `itemLocales` array as well.
   https://github.com/Mantan21/HSR-Warp-Simulator/blob/71815fd739ca179bbaaa958683fb62d799facfa6/src/lib/helpers/i18n.js#L5-L6

If you are not familiar with javascript especially sveltekit or don't know how to use github and can't do development, don't worry, you can still contribute just by creating a new json file based on `en-US.json` and attach it in [new issue](https://github.com/Mantan21/HSR-Warp-Simulator/issues/new), next I will combine it with the main program. I really appreciate your works.

---

## It might take a long time to type all the text manually, so here are some links from the official site that you can open and copy the text

> Replace `LANGUAGE` with language that you want to add, such as **en**, **es**, **fr**, **vi**, **ja**, **th** or others language that available in Genhsin Impact game.

1. [Starter Warp](https://webstatic-sea.hoyoverse.com/hkrpg/event/e20211215gacha/index.html?gacha_id=58d9ed53da77a3ebb1a52c311f892465c5fd&region=prod_official_asia&lang=en#/)
   ```
   https://webstatic-sea.hoyoverse.com/hkrpg/event/e20211215gacha/index.html?gacha_id=58d9ed53da77a3ebb1a52c311f892465c5fd&region=prod_official_asia&lang=LANGUAGE#/
   ```
2. [Regular Warp](https://webstatic-sea.hoyoverse.com/hkrpg/event/e20211215gacha/index.html?gacha_id=ad9815cdf2308104c377aac42c7f0cdd8d&region=prod_official_asia&lang=en#/)
   ```
   https://webstatic-sea.hoyoverse.com/hkrpg/event/e20211215gacha/index.html?gacha_id=ad9815cdf2308104c377aac42c7f0cdd8d&region=prod_official_asia&lang=LANGUAGE#/
   ```
3. [Character Event Warp](https://webstatic-sea.hoyoverse.com/hkrpg/event/e20211215gacha/index.html?gacha_id=dbebc8d9fbb0d4ffa067423482ce505bc5ea&region=prod_official_asia&lang=en#/) (Seele Banner)
   ```
   https://webstatic-sea.hoyoverse.com/hkrpg/event/e20211215gacha/index.html?gacha_id=dbebc8d9fbb0d4ffa067423482ce505bc5ea&region=prod_official_asia&lang=LANGUAGE#/
   ```
4. [Lightcone Warp](https://webstatic-sea.hoyoverse.com/hkrpg/event/e20211215gacha/index.html?gacha_id=ceef3b655e094f3f603c57e581c98dad09b3&region=prod_official_asia&lang=en#/)
   ```
   https://webstatic-sea.hoyoverse.com/hkrpg/event/e20211215gacha/index.html?gacha_id=ceef3b655e094f3f603c57e581c98dad09b3&region=prod_official_asia&lang=LANGUAGE#/
   ```

## Thanks to all contributors who have carried out localization

<table>
   <thead>
      <tr>
         <th> Language </th>
         <th> Contributor </th>
      </tr>
   <thead>
   <tbody>
      <tr>
         <td> Chinese (Simplified) </td>
         <td>
            <a href="https://github.com/Xyyaua">
               <img width="20px" src="https://avatars.githubusercontent.com/u/44024543?s=20" />
               Xyyaua
            </a>
         </td>
      </tr>
      <tr>
         <td> Chinese (Traditional) </td>
         <td>
            <a href="https://github.com/Xyyaua">
               <img width="20px" src="https://avatars.githubusercontent.com/u/44024543?s=20" />
               Xyyaua
            </a>
         </td>
      </tr>
      <tr>
         <td> Japanese </td>
         <td>
            <a href="https://github.com/Sunny-JP">
               <img width="20px" src="https://avatars.githubusercontent.com/u/122193933?s=20" />
               Sunny-JP
            </a>
         </td>
      </tr>
   </tbody>
</table>
